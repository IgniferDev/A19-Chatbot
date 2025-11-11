// src/app/chat/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap, of } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentUser = new BehaviorSubject<any | null>(null);
  currentUser$ = this._currentUser.asObservable();

  constructor(private api: ApiService) {
    this.initFromStorage();
  }

  private initFromStorage() {
    const token = this.api.getAccessToken();
    if (token) {
      // hay token → intentamos cargar perfil
      this.loadProfile().subscribe({
        next: () => console.log('AuthService: perfil cargado desde token'),
        error: (e) => {
          console.warn('AuthService: no se pudo cargar perfil desde token', e);
          this.logout(); // limpiar si token inválido
        }
      });
    } else {
      this._currentUser.next(null);
    }
  }

  login(email: string, password: string): Observable<any> {
    // ApiService.login guarda tokens localmente (si lo has mantenido así).
    // Si no, guardamos aquí.
    return this.api.login(email, password).pipe(
      switchMap(() => {
        // después de guardar tokens, cargamos el profile
        return this.loadProfile();
      }),
      tap(profile => {
        console.log('AuthService: login exitoso, usuario:', profile);
      })
    );
  }

  loadProfile(): Observable<any> {
    return this.api.getProfile().pipe(
      tap(profile => this._currentUser.next(profile))
    );
  }

  logout() {
    this.api.logoutLocal();
    this._currentUser.next(null);
    console.log('AuthService: logout');
  }

  getCurrentUserSnapshot() {
    return this._currentUser.getValue();
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUserSnapshot();
  }
}
