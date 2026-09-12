import { Component } from '@angular/core';
import { APP_CONFIG, SUPPORT_QR_ENABLED } from '@core/config/app.config';
import { PageHero } from '@shared/components/page-hero/page-hero';
import { SupportQr } from '@shared/components/support-qr/support-qr';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

/**
 * "Support Akhuratha Mandap" — the UPI QR and an explanation of where
 * contributions go. There is no payment flow anywhere in this application.
 */
@Component({
  selector: 'app-support',
  standalone: true,
  imports: [PageHero, SupportQr, RevealOnScrollDirective],
  templateUrl: './support.html',
  styleUrl: './support.scss',
})
export class Support {
  readonly mandapName = APP_CONFIG.mandapName;

  /** The Scan & Support QR section only renders while this is true. */
  readonly supportQrEnabled = SUPPORT_QR_ENABLED;

  /** The hero only points at the QR while the QR is actually on the page. */
  readonly heroLede = SUPPORT_QR_ENABLED
    ? 'Your support helps us celebrate Ganesh Festival with devotion and community spirit. Scan the QR below with any UPI app.'
    : 'Your support helps us celebrate Ganesh Festival with devotion and community spirit — through your time, your goodwill and your presence at the mandap.';

  readonly otherWays = [
    {
      icon: 'fa-solid fa-hands-holding-circle',
      title: 'Give your time',
      text: 'Join a seva team for a few hours — decoration, prasad, darshan queue or clean-up.',
    },
    {
      icon: 'fa-solid fa-handshake',
      title: 'Sponsor a programme',
      text: 'Businesses and families can sponsor an aarti, a cultural evening or the mahaprasad.',
    },
    {
      icon: 'fa-solid fa-box-open',
      title: 'Contribute in kind',
      text: 'Flowers, groceries, lighting and sound equipment are all welcome.',
    },
  ];
}
