// src/app/shared/navigation-menu/navigation-menu.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navegation-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navegation-menu.component.html'
})
export class NavegationMenuComponent {
  mobileOpen = false;
  user$: Observable<any | null>;

  constructor(private auth: AuthService) {
    this.user$ = this.auth.currentUser$;
  }

  toggleMobile() { this.mobileOpen = !this.mobileOpen; }
  closeMobile() { this.mobileOpen = false; }
  logout() { this.auth.logout(); }
}
