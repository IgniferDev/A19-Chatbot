// src/app/chat/components/side-menu/side-menu.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  @Output() settingsOpen = new EventEmitter<void>();

  userEmail = 'usuario@mail.com'; // <- aquí
  userName = 'Usuario Genérico';

  chats = [
    { title: 'Conversación 4' },
    { title: 'Conversación 5' },
    { title: 'Conversación 6' },
  ];

  onOpenSettings(): void {
    this.settingsOpen.emit();
  }

  logout(): void {
    console.log('Cerrar sesión (placeholder)');
  }
}
