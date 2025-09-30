import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    CommonModule,   // para *ngIf, *ngFor, ngClass, etc.
    FormsModule,    // para ngModel
     // porque usas <app-side-menu>
  ],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

    showPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
