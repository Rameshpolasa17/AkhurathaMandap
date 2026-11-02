import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { APP_CONFIG } from '@core/config/app.config';
import { ChatAssistantService, ChatLink } from '@core/services/chat-assistant.service';
import { WhatsAppService } from '@core/services/whatsapp.service';

interface ChatMessage {
  id: number;
  from: 'visitor' | 'mandap';
  text: string;
  link?: ChatLink;
}

/**
 * Floating chat box on every public page.
 *
 * Answers come from `ChatAssistantService`, so the header says it is automated
 * rather than implying the committee is typing. The conversation lasts until
 * the page is reloaded; WhatsApp is the way to reach a person.
 */
@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './chat-box.html',
  styleUrl: './chat-box.scss',
})
export class ChatBox {
  private assistant = inject(ChatAssistantService);
  private whatsapp = inject(WhatsAppService);

  private log = viewChild<ElementRef<HTMLElement>>('log');
  private input = viewChild<ElementRef<HTMLInputElement>>('input');
  private toggleButton = viewChild<ElementRef<HTMLButtonElement>>('toggleButton');

  readonly mandapName = APP_CONFIG.mandapName;
  readonly suggestions = this.assistant.suggestions;
  readonly whatsappAvailable = this.whatsapp.isConfigured;

  readonly open = signal(false);
  readonly messages = signal<ChatMessage[]>([
    {
      id: 0,
      from: 'mandap',
      text: `Namaste! I can answer common questions about ${APP_CONFIG.mandapName}. What would you like to know?`,
    },
  ]);

  draft = '';
  private lastQuestion = '';

  toggle(): void {
    this.open.update((isOpen) => !isOpen);
    if (this.open()) {
      setTimeout(() => {
        this.scrollToLatest();
        this.input()?.nativeElement.focus();
      });
    }
  }

  close(): void {
    this.open.set(false);
    this.toggleButton()?.nativeElement.focus();
  }

  send(text: string = this.draft): void {
    const question = text.trim();
    if (!question) {
      return;
    }

    const reply = this.assistant.reply(question);
    this.lastQuestion = question;
    this.draft = '';
    this.messages.update((list) => [
      ...list,
      { id: list.length, from: 'visitor', text: question },
      { id: list.length + 1, from: 'mandap', text: reply.text, link: reply.link },
    ]);
    setTimeout(() => this.scrollToLatest());
  }

  continueOnWhatsApp(): void {
    const greeting = `Hello ${APP_CONFIG.mandapName},`;
    this.whatsapp.openMessage(
      this.lastQuestion ? `${greeting}\n\n${this.lastQuestion}` : greeting,
    );
  }

  private scrollToLatest(): void {
    const log = this.log()?.nativeElement;
    if (log) {
      log.scrollTop = log.scrollHeight;
    }
  }
}
