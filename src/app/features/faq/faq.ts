import { ChangeDetectorRef, Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Faq } from '@core/models/content';
import { ContentService } from '@core/services/content.service';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

const ALL = 'All';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [RouterLink, RevealOnScrollDirective],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export class FaqPage implements OnInit {
  private contentService = inject(ContentService);
  private cdr = inject(ChangeDetectorRef);

  readonly all = ALL;

  faqs: Faq[] = [];
  filtered: Faq[] = [];
  categories: string[] = [ALL];

  readonly activeCategory = signal(ALL);
  /** faqId of the open accordion panel, or null when all are collapsed. */
  readonly openId = signal<number | null>(null);

  ngOnInit(): void {
    this.contentService.getFaqs().subscribe({
      next: (faqs) => {
        this.faqs = faqs;
        this.categories = [ALL, ...new Set(faqs.map((f) => f.category))];
        this.applyFilter();
        // Open the first answer so the page never reads as an empty list.
        this.openId.set(faqs[0]?.faqId ?? null);
        this.cdr.detectChanges();
      },
    });
  }

  selectCategory(category: string): void {
    this.activeCategory.set(category);
    this.applyFilter();
    this.openId.set(this.filtered[0]?.faqId ?? null);
  }

  private applyFilter(): void {
    const category = this.activeCategory();
    this.filtered =
      category === ALL ? [...this.faqs] : this.faqs.filter((f) => f.category === category);
  }

  toggle(faq: Faq): void {
    this.openId.set(this.openId() === faq.faqId ? null : faq.faqId);
  }
}
