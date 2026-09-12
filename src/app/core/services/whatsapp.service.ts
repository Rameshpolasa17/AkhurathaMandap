import { Injectable } from '@angular/core';
import { APP_CONFIG, isWhatsappConfigured } from '@core/config/app.config';

export interface EventRegistration {
  eventName: string;
  name: string;
  mobile: string;
  email?: string;
  message?: string;
}

export interface CompetitionRegistration {
  competitionName: string;
  name: string;
  age?: string;
  mobile: string;
  email?: string;
  message?: string;
}

export interface GeneralMessage {
  name: string;
  mobile: string;
  email?: string;
  message: string;
}

/**
 * The one place the site talks to WhatsApp.
 *
 * The destination number lives in `APP_CONFIG.whatsappNumber` and is not
 * duplicated anywhere else. `wa.me` handles the desktop/mobile split itself:
 * it opens WhatsApp Web in a browser and the native app on a phone.
 */
@Injectable({ providedIn: 'root' })
export class WhatsAppService {
  /** False until a real number is configured — callers use this to hide CTAs. */
  get isConfigured(): boolean {
    return isWhatsappConfigured();
  }

  /** Builds the chat URL without opening it (useful for `href` bindings). */
  buildUrl(message: string): string {
    const text = encodeURIComponent(message.trim());
    return `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${text}`;
  }

  /**
   * Opens WhatsApp in a new tab with the message pre-filled.
   * Returns false if no number has been configured yet.
   */
  openMessage(message: string): boolean {
    if (!this.isConfigured) {
      return false;
    }
    window.open(this.buildUrl(message), '_blank', 'noopener,noreferrer');
    return true;
  }

  openEventRegistration(data: EventRegistration): boolean {
    return this.openMessage(
      [
        `Hello ${APP_CONFIG.mandapName},`,
        '',
        'I would like to register for an event.',
        '',
        `Event: ${data.eventName}`,
        `Name: ${data.name}`,
        `Mobile: ${data.mobile}`,
        ...(data.email ? [`Email: ${data.email}`] : []),
        ...(data.message ? ['', `Message:`, data.message] : []),
        '',
        'Thank you.',
      ].join('\n'),
    );
  }

  openCompetitionRegistration(data: CompetitionRegistration): boolean {
    return this.openMessage(
      [
        `Hello ${APP_CONFIG.mandapName},`,
        '',
        'I would like to register for a competition.',
        '',
        `Competition: ${data.competitionName}`,
        `Participant Name: ${data.name}`,
        ...(data.age ? [`Age: ${data.age}`] : []),
        `Mobile: ${data.mobile}`,
        ...(data.email ? [`Email: ${data.email}`] : []),
        ...(data.message ? ['', `Message:`, data.message] : []),
        '',
        'Thank you.',
      ].join('\n'),
    );
  }

  openGeneralMessage(data: GeneralMessage): boolean {
    return this.openMessage(
      [
        `Hello ${APP_CONFIG.mandapName},`,
        '',
        'I would like to send a message.',
        '',
        `Name: ${data.name}`,
        `Mobile: ${data.mobile}`,
        ...(data.email ? [`Email: ${data.email}`] : []),
        '',
        'Message:',
        data.message,
      ].join('\n'),
    );
  }
}
