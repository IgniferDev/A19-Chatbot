// src/app/chat/components/settings-modal/settings-modal.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-settings-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings-modal.component.html',
})
export class SettingsModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() saveChanges = new EventEmitter<any>();

  // Datos de perfil
  userName = 'Usuario';
  userLastName = 'Genérico';
  userEmail = 'usuario@mail.com';
  profileImageUrl = 'https://cdn.miiwiki.org/8/85/Default_Male_Mii.png';

  // Password
  showPasswordFields = false;
  newPassword = '';
  confirmNewPassword = '';

  // File seleccionado (para upload real)
  selectedFile?: File;

  loading = false;
  error = '';

  constructor(private api: ApiService, private router: Router, private auth: AuthService) {
    // intenta cargar perfil al abrir (si el modal se crea en cada apertura)
    this.loadProfile();
  }

  // carga datos del backend (si hay token)
  loadProfile(): void {
    this.api.getProfile().subscribe({
      next: (p) => {
        this.userName = p.first_name || '';
        this.userLastName = p.last_name || '';
        this.userEmail = p.email || '';
        if (p.profile_image) this.profileImageUrl = p.profile_image;
      },
      error: () => {
        // no crítico: puede no estar autenticado aún
      }
    });
  }

  // ---------- necesario por la plantilla ----------
  togglePasswordFields(): void {
    this.showPasswordFields = !this.showPasswordFields;
    if (!this.showPasswordFields) {
      this.newPassword = '';
      this.confirmNewPassword = '';
    }
  }
  // ------------------------------------------------

  onBackdropClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('fixed')) {
      this.closeModal();
    }
  }

  closeModal(): void {
    this.close.emit();
  }

  triggerFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  // preview rápido (sin subir): sigue usando selectedFile para el upload real
  onFileSelectedReal(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.profileImageUrl = (e.target as FileReader).result as string);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // llama al API para actualizar perfil (multipart/form-data)
  save(): void {
    this.error = '';
    if (this.showPasswordFields) {
      if (!this.newPassword || !this.confirmNewPassword) {
        this.error = 'Por favor completa ambos campos de contraseña.';
        return;
      }
      if (this.newPassword !== this.confirmNewPassword) {
        this.error = 'Las contraseñas no coinciden.';
        return;
      }
    }

    this.loading = true;
    const form = new FormData();
    form.append('first_name', this.userName);
    form.append('last_name', this.userLastName);
    form.append('email', this.userEmail);
    if (this.selectedFile) form.append('profile_image', this.selectedFile);

    this.api.updateProfile(form).subscribe({
      next: () => {
        if (this.showPasswordFields) {
          this.api.changePassword(null, this.newPassword, this.confirmNewPassword).subscribe({
            next: () => {
              this.loading = false;
              this.saveChanges.emit(null);
              this.closeModal();
            },
            error: (err) => {
              this.loading = false;
              this.error = err?.error || 'Error al cambiar contraseña';
            }
          });
        } else {
          this.loading = false;
          this.saveChanges.emit(null);
          this.closeModal();
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error || 'Error al actualizar perfil';
      }
    });
  }

  confirmDeleteAccount(): void {
  const ok = confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede revertir.');
  if (!ok) return;

  this.api.deleteAccount().subscribe({
    next: () => {
      this.api.logoutLocal();        // limpiar tokens
      this.auth.logout();           // limpiar estado
      alert('Cuenta eliminada.');
      this.closeModal();
      this.router.navigate(['/']);
    },
    error: (err) => {
      alert(err?.error || 'Error al eliminar cuenta');
    }
  });
}


  confirmClearHistory(): void {
    if (!confirm('¿Deseas eliminar todo tu historial?')) return;
    this.api.clearHistory().subscribe({
      next: () => alert('Historial eliminado.'),
      error: (err) => alert(err?.error || 'Error al borrar historial')
    });
  }
}
