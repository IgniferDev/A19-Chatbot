import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings-modal.component.html',
})
export class SettingsModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() saveChanges = new EventEmitter<any>();

  // Datos de ejemplo
  userName = 'Usuario';
  userLastName = 'Genérico';
  userEmail = 'usuario@mail.com';
  profileImageUrl = 'https://cdn.miiwiki.org/8/85/Default_Male_Mii.png';

  // Contraseña
  showPasswordFields = false;
  newPassword = '';
  confirmNewPassword = '';

  // ---------- NUEVO: Manejo de click en fondo ----------
  onBackdropClick(event: MouseEvent): void {
    // Evita cerrar si se hace click dentro del modal
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImageUrl = (e.target as FileReader).result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  togglePasswordFields(): void {
    this.showPasswordFields = !this.showPasswordFields;
    if (!this.showPasswordFields) {
      this.newPassword = '';
      this.confirmNewPassword = '';
    }
  }

  save(): void {
    if (this.showPasswordFields) {
      if (!this.newPassword || !this.confirmNewPassword) {
        alert('Por favor completa ambos campos de contraseña.');
        return;
      }
      if (this.newPassword !== this.confirmNewPassword) {
        alert('Las contraseñas no coinciden.');
        return;
      }
    }

    const payload = {
      userName: this.userName,
      userLastName: this.userLastName,
      userEmail: this.userEmail,
      profileImageUrl: this.profileImageUrl,
      passwordChanged: this.showPasswordFields,
    };

    console.log('Guardar cambios (simulado):', payload);
    this.saveChanges.emit(payload);
    this.closeModal();
  }

  confirmDeleteAccount(): void {
    const ok = confirm(
      '¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede revertir.'
    );
    if (ok) {
      console.log('Cuenta eliminada (simulado)');
      alert('Cuenta eliminada (simulado).');
      this.closeModal();
    }
  }

  confirmClearHistory(): void {
    const ok = confirm(
      '¿Deseas eliminar tu historial de conversaciones? Esta acción no se puede revertir.'
    );
    if (ok) {
      console.log('Historial eliminado (simulado)');
      alert('Historial eliminado (simulado).');
    }
  }
}
