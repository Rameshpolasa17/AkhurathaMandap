import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';

/**
 * An image that can never render as a broken-image icon.
 *
 * While the real photo is missing (the site ships before the festival photos
 * are added), it draws a warm branded tile with an icon instead. Drop the file
 * into `src/assets/images/...` and it appears automatically — no code change.
 */
@Component({
  selector: 'app-safe-image',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (src && !failed) {
      <img
        [src]="src"
        [alt]="alt"
        [style.object-fit]="fit"
        [style.object-position]="position"
        [attr.width]="width"
        [attr.height]="height"
        [attr.srcset]="srcset || null"
        [attr.sizes]="srcset ? sizes : null"
        [attr.fetchpriority]="fetchPriority"
        [attr.loading]="eager ? null : 'lazy'"
        [attr.decoding]="'async'"
        (error)="onError()"
      />
    } @else {
      <div class="akm-img-fallback" role="img" [attr.aria-label]="alt">
        <i [class]="icon" aria-hidden="true"></i>
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    `,
  ],
})
export class SafeImage {
  private _src = '';

  @Input()
  set src(value: string) {
    if (value !== this._src) {
      this._src = value ?? '';
      // A new source deserves a fresh attempt.
      this.failed = false;
    }
  }
  get src(): string {
    return this._src;
  }

  /** Required for accessibility — describes the photo, not the file. */
  @Input() alt = '';
  /** Font Awesome class shown on the fallback tile. */
  @Input() icon = 'fa-solid fa-image';
  /** Skip lazy-loading for above-the-fold images. */
  @Input() eager = false;
  /** `cover` crops to fill (cards); `contain` fits the whole frame (lightbox). */
  @Input() fit: 'cover' | 'contain' = 'cover';
  /** CSS `object-position` — which part of a cropped photo stays in view. */
  @Input() position: string | null = null;
  /** Intrinsic size, so the browser can reserve space before the file arrives. */
  @Input() width: number | null = null;
  @Input() height: number | null = null;
  /** Optional responsive candidates; `sizes` is only sent alongside them. */
  @Input() srcset = '';
  @Input() sizes = '100vw';
  /** `high` for the one hero image a page is built around. */
  @Input() fetchPriority: 'high' | 'low' | 'auto' | null = null;

  /** Emits once when the file is missing or cannot be decoded. */
  @Output() loadFailed = new EventEmitter<void>();

  failed = false;

  onError(): void {
    this.failed = true;
    this.loadFailed.emit();
  }
}
