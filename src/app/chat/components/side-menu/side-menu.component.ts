import { Component } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {

  chats = [
    { title: 'Conversación 4' },
    { title: 'Conversación 5' },
    { title: 'Conversación 6' },
  ];

  openSettings() {
    // Aquí luego abriremos el modal de ajustes
    console.log('Abrir modal de ajustes...');
  }

  logout(){

  }
}
