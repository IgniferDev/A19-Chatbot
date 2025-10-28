// src/app/shared/navigation-menu/navigation-menu.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navegation-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navegation-menu.component.html'
})
export class NavegationMenuComponent {
  mobileOpen = false;

  toggleMobile() {
    this.mobileOpen = !this.mobileOpen;
  }

  closeMobile() {
    this.mobileOpen = false;
  }
}
