// src/app/chat/pages/register-page/register-page.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  showPassword = false;

  // campos del formulario
  nombre = '';
  apellidos = '';
  fecha = ''; // input type=date -> yyyy-mm-dd
  genero = '';
  pais = '';
  email = '';
  password = '';
  confirm = '';

  loading = false;
  error = '';

  constructor(private api: ApiService, private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // dentro de RegisterPageComponent (reemplaza onSubmit)
onSubmit(event: Event) {
  event.preventDefault();
  this.error = '';
  if (!this.email || !this.password || !this.confirm) {
    this.error = 'Completa los campos obligatorios.';
    return;
  }
  if (this.password !== this.confirm) {
    this.error = 'Las contraseñas no coinciden.';
    return;
  }

  // Enviar birth_date como ISO (YYYY-MM-DD) si existe.
  // Tu backend acepta ISO ('%Y-%m-%d') o ddmmaaaa.
  const birth = this.fecha ? this.fecha : '';

  const payload = {
    username: this.email.split('@')[0],
    first_name: this.nombre,
    last_name: this.apellidos,
    birth_date: birth,
    gender: this.genero,
    country: this.pais,
    email: this.email,
    password: this.password,
    password2: this.confirm
  };

  this.loading = true;

  this.api.register(payload).subscribe({
    next: (res) => {
      this.loading = false;
      // registro correcto -> redirigir a login
      this.router.navigate(['/login']);
    },
    error: (err) => {
      this.loading = false;
      // Imprime toda la respuesta para debug en consola
      console.error('Register error raw:', err);

      // Mensajes comunes que devuelve DRF: objeto con campos { field: ["msg"] } o { "detail": "..." }
      if (err?.error) {
        // Si el backend devuelve un objeto con keys (validez por campo)
        if (typeof err.error === 'object') {
          // arma un mensaje legible
          const parts: string[] = [];
          for (const k of Object.keys(err.error)) {
            const val = err.error[k];
            if (Array.isArray(val)) {
              parts.push(`${k}: ${val.join(' ')}`);
            } else if (typeof val === 'object') {
              parts.push(`${k}: ${JSON.stringify(val)}`);
            } else {
              parts.push(`${k}: ${val}`);
            }
          }
          this.error = parts.join(' — ');
        } else {
          // texto plano o detalle
          this.error = err.error;
        }
      } else {
        this.error = err?.message || 'Error al registrar';
      }
    }
  });
}

}
