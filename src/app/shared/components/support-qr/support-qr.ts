import { Component, Input } from '@angular/core';
import { APP_CONFIG } from '@core/config/app.config';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

/**
 * "Support Akhuratha Mandap" — a UPI QR code and nothing else.
 *
 * There is deliberately no payment flow in this application: no amounts, no
 * gateway, no order/verify calls. Devotees scan the QR with their own UPI app,
 * which is where the transaction actually happens.
 */
@Component({
  selector: 'app-support-qr',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './support-qr.html',
  styleUrl: './support-qr.scss',
})
export class SupportQr {
  /** Set to false on the dedicated /support page, which has its own hero. */
  @Input() showHeading = true;

  readonly mandapName = APP_CONFIG.mandapName;
  readonly qrImage = APP_CONFIG.supportQrImage;

  /** Filename offered by the download link. */
  readonly downloadName = 'akhuratha-mandap-upi-qr.png';

  qrMissing = false;

  readonly upiApps = ['PhonePe', 'Google Pay', 'Paytm', 'Any UPI App'];

  readonly usedFor = [
    { icon: 'fa-solid fa-utensils', label: 'Annadanam & prasad seva' },
    { icon: 'fa-solid fa-fire', label: 'Daily aarti & puja' },
    { icon: 'fa-solid fa-star', label: 'Mandap decoration' },
    { icon: 'fa-solid fa-masks-theater', label: 'Cultural programmes' },
  ];
}
