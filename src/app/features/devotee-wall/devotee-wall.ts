import { Component, HostListener, OnDestroy, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { APP_CONFIG, activeSocialLinks } from '@core/config/app.config';
import { DEVOTEE_PHOTOS, DevoteePhoto } from '@core/mock-data/devotee-photos.mock';
import { WhatsAppService } from '@core/services/whatsapp.service';
import { formatDate } from '@core/utils/festival-calendar';
import { PageHero } from '@shared/components/page-hero/page-hero';
import { SafeImage } from '@shared/components/safe-image/safe-image';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

/**
 * Devotee Photo Wall — devotees send a selfie with Bappa on WhatsApp and the
 * committee posts the ones they like. Photos live in `devotee-photos.mock.ts`.
 */
@Component({
  selector: 'app-devotee-wall',
  standalone: true,
  imports: [RouterLink, PageHero, SafeImage, RevealOnScrollDirective],
  templateUrl: './devotee-wall.html',
  styleUrl: './devotee-wall.scss',
})
export class DevoteeWall implements OnDestroy {
  private whatsapp = inject(WhatsAppService);

  readonly photos = DEVOTEE_PHOTOS;
  readonly rajaTitle = APP_CONFIG.rajaTitle;
  readonly canSend = this.whatsapp.isConfigured;
  readonly instagram = activeSocialLinks().find((s) => s.label === 'Instagram');

  /** The message a devotee sends along with their photo. */
  readonly sendUrl = this.whatsapp.buildUrl(
    [
      `Hello ${APP_CONFIG.mandapName} 🙏`,
      '',
      'Here is my photo with Bappa for the Devotee Photo Wall.',
      '',
      'Name (optional): ',
      'Place (optional): ',
      '',
      'I took this photo and I agree that Akhuratha Mandap may post it on its website and Instagram.',
    ].join('\n'),
  );

  readonly viewerIndex = signal(-1);
  readonly active = computed<DevoteePhoto | null>(() => this.photos[this.viewerIndex()] ?? null);

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  caption(photo: DevoteePhoto): string {
    return [photo.name, photo.place].filter(Boolean).join(' · ');
  }

  shortDate(isoDate: string): string {
    return formatDate(isoDate, { year: true });
  }

  open(index: number): void {
    this.viewerIndex.set(index);
    document.body.style.overflow = 'hidden';
  }

  close(): void {
    this.viewerIndex.set(-1);
    document.body.style.overflow = '';
  }

  step(delta: number): void {
    const count = this.photos.length;
    if (count < 2) return;
    this.viewerIndex.set((this.viewerIndex() + delta + count) % count);
  }

  onBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.close();
  }

  @HostListener('document:keydown', ['$event'])
  onKey(event: KeyboardEvent): void {
    if (this.viewerIndex() < 0) return;
    if (event.key === 'Escape') this.close();
    if (event.key === 'ArrowRight') this.step(1);
    if (event.key === 'ArrowLeft') this.step(-1);
  }
}
