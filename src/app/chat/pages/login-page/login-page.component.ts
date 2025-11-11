// src/app/chat/pages/login-page/login-page.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
//import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  showPassword = false;
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor( private router: Router, private auth: AuthService,) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.error = '';
    if (!this.email || !this.password) {
      this.error = 'Completa correo y contraseña.';
      return;
    }
    this.loading = true;
this.auth.login(this.email, this.password).subscribe({
  next: () => {
    this.loading = false;
    this.router.navigate(['/chat']);
  },
  error: (err) => {
    this.loading = false;
    this.error = err?.error?.detail || 'Error al iniciar sesión';
  }
});
  }
}
