import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  @Output() settingsOpen = new EventEmitter<void>();
  user$: Observable<any | null>;
  baseUrl = window.location.origin;
  defaultAvatar = 'https://cdn.miiwiki.org/8/85/Default_Male_Mii.png';

  constructor(private auth: AuthService, private router: Router) {
    this.user$ = this.auth.currentUser$;
  }

  onOpenSettings(): void {

    this.settingsOpen.emit();
    // este emitter lo sustituías antes; si necesitas EventEmitter, adapta
    // aquí puedes emitir o usar un service para abrir modal. Si vas a usar Output,
    // añade @Output() settingsOpen = new EventEmitter<void>(); y emítelo.
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }


  // Devuelve URL correcta para la imagen del perfil
  getProfileImage(user: any): string {
    if (!user) return this.defaultAvatar;
    const img = user.profile_image;
    if (!img) return this.defaultAvatar;
    // si ya es URL absoluta
    if (typeof img === 'string' && (img.startsWith('http') || img.startsWith('data:'))) {
      return img;
    }
    // si es ruta relativa (ej: /media/profiles/xxx.jpg) la prefixeamos
    if (typeof img === 'string') {
      if (img.startsWith('/')) return `${this.baseUrl}${img}`;
      return `${this.baseUrl}/${img}`;
    }
    return this.defaultAvatar;
  }
}
