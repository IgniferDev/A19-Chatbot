import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';


@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [
    CommonModule,   // para *ngIf, *ngFor, ngClass, etc.
    FormsModule,    // para ngModel
    SideMenuComponent, // porque usas <app-side-menu>
  ],
  templateUrl: './chat-page.component.html',
})
export class ChatPageComponent implements AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  inputText = '';
  messages: { text: string; from: 'user' | 'bot' }[] = [
    { text: 'Hola, soy EmoBot. ¿En qué puedo ayudarte hoy?', from: 'bot' },
  ];

  sendMessage(event: Event) {
    event.preventDefault();
    if (!this.inputText.trim()) return;

    // Mensaje del usuario
    this.messages.push({ text: this.inputText, from: 'user' });

    const userMessage = this.inputText;
    this.inputText = '';

    // Simular respuesta del bot después de 500ms
    setTimeout(() => {
      const botReply = this.getBotReply(userMessage);
      this.messages.push({ text: botReply, from: 'bot' });
      this.scrollToBottom();
    }, 500);

    this.scrollToBottom();
  }

  // Respuesta simulada del bot
  getBotReply(userMsg: string): string {
    // Respuestas de ejemplo
    if (userMsg.toLowerCase().includes('ansiedad')) {
      return 'Parece que mencionas ansiedad. Recuerda que puedes buscar ayuda profesional si lo necesitas.';
    } else if (userMsg.toLowerCase().includes('depresion') || userMsg.toLowerCase().includes('depresión')) {
      return 'Detecto que hablas de depresión. Considera hablar con un especialista para recibir orientación.';
    } else {
      return 'Gracias por tu mensaje. EmoBot está aquí para escucharte y ayudarte a detectar emociones en tus textos.';
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch {}
  }
}
