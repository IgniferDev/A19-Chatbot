import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavegationMenuComponent } from './chat/components/navegation-menu/navegation-menu.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavegationMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chatbot19';
}
