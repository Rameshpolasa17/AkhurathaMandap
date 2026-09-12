import { Component, Input } from '@angular/core';

/**
 * The standard maroon page banner, so every secondary page opens with the
 * same rhythm instead of each one inventing its own.
 */
@Component({
  selector: 'app-page-hero',
  standalone: true,
  imports: [],
  template: `
    <section class="ph" [attr.aria-labelledby]="titleId">
      <div class="ph__veil" aria-hidden="true"></div>
      <div class="akm-orb ph__orb" aria-hidden="true"></div>

      <div class="akm-container ph__inner">
        @if (eyebrow) {
          <span class="akm-eyebrow">
            @if (icon) {
              <i [class]="icon" aria-hidden="true"></i>
            }
            {{ eyebrow }}
          </span>
        }

        <h1 [id]="titleId">{{ heading }}</h1>

        @if (lede) {
          <p>{{ lede }}</p>
        }
      </div>
    </section>
  `,
  styleUrl: './page-hero.scss',
})
export class PageHero {
  @Input() eyebrow = '';
  @Input() icon = '';
  @Input({ required: true }) heading = '';
  @Input() lede = '';
  /** Anchor for `aria-labelledby`; give each page a unique value. */
  @Input() titleId = 'page-title';
}
