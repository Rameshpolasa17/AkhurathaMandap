import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

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
        [attr.loading]="eager ? null : 'lazy'"
        [attr.decoding]="'async'"
        (error)="failed = true"
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

  failed = false;
}
