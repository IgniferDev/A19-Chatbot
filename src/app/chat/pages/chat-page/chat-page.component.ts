// src/app/chat/pages/chat-page/chat-page.component.ts
import { Component, ElementRef, ViewChild, AfterViewChecked, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { SettingsModalComponent } from '../../components/settings-modal/settings-modal.component';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [CommonModule, FormsModule, SideMenuComponent, SettingsModalComponent],
  templateUrl: './chat-page.component.html',
})
export class ChatPageComponent implements AfterViewChecked, OnInit {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  // Visibilidad side-menu: por defecto en desktop true, en móvil false
  showSideMenu = true;
  isMobile = false;

  showSettings = false;
  inputText = '';
  messages: { text: string; from: 'user' | 'bot' }[] = [
    { text: 'Hola, soy EmoBot. ¿En qué puedo ayudarte hoy?', from: 'bot' },
  ];

  ngOnInit(): void {
    this.updateViewport();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateViewport();
  }

  private updateViewport(): void {
    this.isMobile = window.innerWidth < 768; // md breakpoint
    // en móvil por defecto ocultamos el side menu
    this.showSideMenu = this.isMobile ? false : true;
  }

  toggleSideMenu(): void {
    this.showSideMenu = !this.showSideMenu;
  }

  // chat logic (igual que ya tienes)
  sendMessage(event: Event): void {
    event.preventDefault();
    if (!this.inputText.trim()) return;

    this.messages.push({ text: this.inputText, from: 'user' });
    const userMessage = this.inputText;
    this.inputText = '';

    setTimeout(() => {
      const botReply = this.getBotReply(userMessage);
      this.messages.push({ text: botReply, from: 'bot' });
      this.scrollToBottom();
    }, 500);

    this.scrollToBottom();
  }

  getBotReply(userMsg: string): string {
    if (userMsg.toLowerCase().includes('ansiedad')) {
      return 'Parece que mencionas ansiedad. Recuerda que puedes buscar ayuda profesional si lo necesitas.';
    } else if (userMsg.toLowerCase().includes('depresion') || userMsg.toLowerCase().includes('depresión')) {
      return 'Detecto que hablas de depresión. Considera hablar con un especialista para recibir orientación.';
    } else {
      return 'Gracias por tu mensaje. EmoBot está aquí para escucharte y ayudarte a detectar emociones en tus textos.';
    }
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch {}
  }
}
