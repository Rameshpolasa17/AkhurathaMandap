import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Announcement } from '@core/models/announcement';
import { AnnouncementService } from '@core/services/announcement';
import { PageHero } from '@shared/components/page-hero/page-hero';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';
import { APP_CONFIG } from '@core/config/app.config';
import { siteUrl, whatsAppShareUrl } from '@core/utils/festival-calendar';

const ALL = 'All';
const PAGE_SIZE = 8;

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [DatePipe, FormsModule, RouterLink, PageHero, RevealOnScrollDirective],
  templateUrl: './announcements.html',
  styleUrl: './announcements.scss',
})
export class Announcements implements OnInit {
  private announcementService = inject(AnnouncementService);
  private cdr = inject(ChangeDetectorRef);

  readonly all = ALL;

  announcements: Announcement[] = [];
  filtered: Announcement[] = [];
  displayed: Announcement[] = [];
  categories: string[] = [ALL];

  searchText = '';

  readonly selectedCategory = signal(ALL);
  readonly selected = signal<Announcement | null>(null);
  readonly copied = signal(false);

  private loadCount = PAGE_SIZE;

  /** Native share is only offered where the browser actually supports it. */
  readonly canShare = typeof navigator !== 'undefined' && !!navigator.share;

  ngOnInit(): void {
    this.announcementService.getAll().subscribe({
      next: (response) => {
        const today = new Date();

        this.announcements = response
          .filter((a) => a.isActive && (!a.expiryDate || new Date(a.expiryDate) >= today))
          .sort(
            (a, b) =>
              new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
          );

        this.categories = [
          ALL,
          ...new Set(this.announcements.map((a) => this.categoryOf(a))),
        ];

        this.applyFilter();
        this.cdr.detectChanges();
      },
    });
  }

  /* -------------------------------------------------------------- filter */

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
    this.applyFilter();
  }

  search(): void {
    this.applyFilter();
  }

  private applyFilter(): void {
    const category = this.selectedCategory();
    const term = this.searchText.trim().toLowerCase();

    this.filtered = this.announcements.filter((a) => {
      const matchesCategory = category === ALL || this.categoryOf(a) === category;
      const matchesTerm =
        !term ||
        a.title.toLowerCase().includes(term) ||
        a.description.toLowerCase().includes(term);
      return matchesCategory && matchesTerm;
    });

    this.loadCount = PAGE_SIZE;
    this.refresh();
  }

  private refresh(): void {
    this.displayed = this.filtered.slice(0, this.loadCount);
  }

  get hasMore(): boolean {
    return this.displayed.length < this.filtered.length;
  }

  loadMore(): void {
    this.loadCount += PAGE_SIZE;
    this.refresh();
  }

  /* --------------------------------------------------------------- badges */

  /**
   * Uses the announcement's own category when it has one, and otherwise
   * derives a topic from the wording so notices added from the admin screen
   * still group sensibly.
   */
  categoryOf(item: Announcement): string {
    if (item.category) {
      return item.category;
    }

    const value = `${item.title} ${item.description}`.toLowerCase();
    if (value.includes('harathi') || value.includes('aarti')) return 'Ganga Harathi';
    if (value.includes('laddu') || value.includes('velam')) return 'Laddu Velam';
    if (value.includes('lucky draw')) return 'Lucky Draw';
    if (value.includes('nimarjanam') || value.includes('procession')) return 'Nimarjanam';
    if (value.includes('pooja') || value.includes('puja')) return 'Pooja';
    if (value.includes('competition')) return 'Competitions';
    if (value.includes('volunteer') || value.includes('seva')) return 'Volunteering';
    if (value.includes('festival') || value.includes('ganesh')) return 'Festival';
    return 'Notice';
  }

  isNew(item: Announcement): boolean {
    const published = new Date(item.publishDate).getTime();
    return Date.now() - published < 3 * 86400000;
  }

  /* ---------------------------------------------------------------- modal */

  open(item: Announcement): void {
    this.selected.set(item);
    this.copied.set(false);
    document.body.style.overflow = 'hidden';
  }

  close(): void {
    this.selected.set(null);
    document.body.style.overflow = '';
  }

  onBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.selected()) {
      this.close();
    }
  }

  /** WhatsApp link carrying the notice, ready to forward to family groups. */
  shareUrl(item: Announcement): string {
    return whatsAppShareUrl(
      [
        `📢 *${item.title}*`,
        `— ${APP_CONFIG.mandapName}, ${APP_CONFIG.contact.city}`,
        '',
        item.description,
        '',
        `More: ${siteUrl('/announcements')}`,
      ].join('\n'),
    );
  }

  share(item: Announcement): void {
    navigator
      .share({ title: item.title, text: item.description, url: location.href })
      .catch(() => {
        // The user dismissed the share sheet — nothing to do.
      });
  }

  copy(item: Announcement): void {
    navigator.clipboard
      .writeText(`${item.title}\n\n${item.description}`)
      .then(() => {
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 2500);
      })
      .catch(() => {
        // Clipboard permission denied — the text stays visible on screen.
      });
  }
}
