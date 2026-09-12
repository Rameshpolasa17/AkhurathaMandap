import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  APP_CONFIG,
  activeSocialLinks,
  mailHref,
  SocialLink,
  telHref,
} from '@core/config/app.config';
import {
  FOOTER_EXPLORE,
  FOOTER_MANDAP,
  NavLink,
  visibleLinks,
} from '@core/config/navigation';
import { WhatsAppService } from '@core/services/whatsapp.service';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, RevealOnScrollDirective],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private whatsapp = inject(WhatsAppService);

  readonly config = APP_CONFIG;
  readonly year = new Date().getFullYear();

  /** Kids links are filtered out here while KIDS_ENABLED is false. */
  readonly explore: NavLink[] = visibleLinks(FOOTER_EXPLORE);
  readonly mandap: NavLink[] = visibleLinks(FOOTER_MANDAP);

  /** Only social profiles that have a real URL configured are rendered. */
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
