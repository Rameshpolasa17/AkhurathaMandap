import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  APP_CONFIG,
  activeSocialLinks,
  mailHref,
  SocialLink,
  telHref,
} from '@core/config/app.config';
import { WhatsAppService } from '@core/services/whatsapp.service';
import { LocationSection } from '@shared/components/location-section/location-section';
import { MessageForm } from '@shared/components/message-form/message-form';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, LocationSection, MessageForm, RevealOnScrollDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private whatsapp = inject(WhatsAppService);

  readonly config = APP_CONFIG;
  readonly social: SocialLink[] = activeSocialLinks();
  readonly whatsappAvailable = this.whatsapp.isConfigured;

  readonly telHref = telHref();
  readonly mailHref = mailHref();

  openWhatsapp(): void {
    this.whatsapp.openMessage(
      `Hello ${this.config.mandapName},\n\nI would like to know more about the festival.`,
    );
  }
}
