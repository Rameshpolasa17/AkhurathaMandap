import { Component, inject } from '@angular/core';

import { APP_CONFIG, mailHref, telHref } from '@core/config/app.config';
import { WhatsAppService } from '@core/services/whatsapp.service';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

/**
 * "Find the Mandap" — the address, the ways to reach the committee, and a
 * Get Directions button that opens the mandap's pin in Google Maps.
 *
 * Every value comes from `APP_CONFIG.contact`, so this renders on both the
 * home page and the Contact page without duplicating any detail.
 */
@Component({
  selector: 'app-location-section',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './location-section.html',
  styleUrl: './location-section.scss',
})
export class LocationSection {
  private whatsapp = inject(WhatsAppService);

  readonly config = APP_CONFIG;
  readonly telHref = telHref();
  readonly mailHref = mailHref();
  readonly mapsUrl = APP_CONFIG.contact.mapsUrl;
  readonly whatsappAvailable = this.whatsapp.isConfigured;

  openWhatsapp(): void {
    this.whatsapp.openMessage(
      `Hello ${this.config.mandapName},\n\nI would like to know more about the festival.`,
    );
  }
}
