// src/app/chat/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface AuthTokens {
  access: string;
  refresh: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // ajusta BASE_URL según dónde esté corriendo tu django
  private BASE_URL = 'http://127.0.0.1:8000/api/accounts';

  constructor(private http: HttpClient) {}

  // ----------------- AUTH -----------------
  register(payload: any): Observable<any> {
    // payload: { username, first_name, last_name, birth_date(ddmmaaaa), gender, country, email, password, password2 }
    return this.http.post(`${this.BASE_URL}/register/`, payload);
  }

  login(email: string, password: string): Observable<AuthTokens> {
    return this.http.post<AuthTokens>(`${this.BASE_URL}/login/`, { email, password })
      .pipe(
        tap(tokens => {
          // guardado local simple
          localStorage.setItem('access_token', tokens.access);
          localStorage.setItem('refresh_token', tokens.refresh);
        })
      );
  }

  refreshToken(refresh: string): Observable<AuthTokens> {
    return this.http.post<AuthTokens>(`${this.BASE_URL}/token/refresh/`, { refresh })
      .pipe(tap(tokens => {
        localStorage.setItem('access_token', tokens.access);
      }));
  }

  logoutLocal(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  // ----------------- PROFILE -----------------
  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/profile/`);
  }

  updateProfile(formData: FormData): Observable<any> {
    // formData puede incluir profile_image file, y otros campos (first_name, last_name, email, birth_date, gender, country)
    return this.http.patch<any>(`${this.BASE_URL}/profile/`, formData);
  }

  changePassword(old_password: string | null, new_password: string, confirm_password: string): Observable<any> {
    const payload: any = { new_password, confirm_password };
    if (old_password) payload.old_password = old_password;
    return this.http.post<any>(`${this.BASE_URL}/change-password/`, payload);
  }

  deleteAccount(): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}/delete-account/`);
  }

  clearHistory(): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/chats/clear/`, {});
  }

  // ----------------- CHATS (opcional) -----------------
  getChats(): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/chats/`);
  }

  postChatMessage(payload: { role: string; text: string }): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/chats/`, payload);
  }

  // ----------------- Helpers -----------------
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
