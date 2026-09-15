import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  computed,
  signal,
  viewChild,
} from '@angular/core';

import { FestivalPhoto } from '@core/mock-data/festival-photos.mock';

/**
 * A light full-screen photo preview: arrow keys / swipe to move, Escape or the
 * backdrop to close. Focus moves into the dialog on open and back to the tile
 * that opened it on close.
 */
@Component({
  selector: 'app-photo-lightbox',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (photo(); as p) {
      <div
        class="plb"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="title + ': ' + p.caption"
        (click)="onBackdrop($event)"
        (touchstart)="onTouchStart($event)"
        (touchend)="onTouchEnd($event)"
      >
        <button #closeBtn type="button" class="plb__btn plb__close" aria-label="Close preview" (click)="closed.emit()">
          <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>

        @if (photos.length > 1) {
          <button type="button" class="plb__btn plb__nav plb__nav--prev" aria-label="Previous photo" (click)="go(-1)">
            <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
          </button>
          <button type="button" class="plb__btn plb__nav plb__nav--next" aria-label="Next photo" (click)="go(1)">
            <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
          </button>
        }

        <figure class="plb__figure">
          <img class="plb__img" [src]="p.src" [alt]="p.alt" [attr.width]="p.width" [attr.height]="p.height" decoding="async" />
          <figcaption>
            <strong>{{ p.caption }}</strong>
            @if (photos.length > 1) {
              <span>{{ index() + 1 }} / {{ photos.length }}</span>
            }
          </figcaption>
        </figure>
      </div>
    }
  `,
  styles: [
    `
      .plb {
        position: fixed;
        inset: 0;
        z-index: 1600;
        display: grid;
        place-items: center;
        padding: 64px 16px 88px;
        background: rgba(18, 4, 2, 0.95);
        animation: plbFade 0.22s ease;
      }

      .plb__figure {
        display: grid;
        justify-items: center;
        gap: 14px;
        margin: 0;
        max-width: min(100%, 1100px);
      }

      .plb__img {
        display: block;
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: calc(100vh - 190px);
        max-height: calc(100dvh - 190px);
        border-radius: 10px;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
        animation: plbZoom 0.32s var(--akm-ease);
      }

      figcaption {
        display: flex;
        align-items: baseline;
        gap: 14px;
        color: #fff;
      }

      figcaption strong {
        font-family: 'Cinzel', Georgia, serif;
        font-weight: 600;
        letter-spacing: 0.02em;
      }

      figcaption span {
        font-size: 0.82rem;
        color: rgba(255, 255, 255, 0.65);
      }

      .plb__btn {
        position: absolute;
        display: grid;
        place-items: center;
        width: 48px;
        height: 48px;
        border: 1px solid rgba(255, 255, 255, 0.22);
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
        font-size: 1.1rem;
        cursor: pointer;
        transition: background var(--akm-t-fast);
      }

      .plb__btn:hover {
        background: rgba(255, 255, 255, 0.22);
      }

      .plb__close {
        top: 14px;
        right: 14px;
      }

      .plb__nav {
        top: 50%;
        translate: 0 -50%;
      }

      .plb__nav--prev {
        left: 16px;
      }

      .plb__nav--next {
        right: 16px;
      }

      @media (max-width: 767.98px) {
        .plb__nav {
          top: auto;
          bottom: 20px;
          translate: none;
        }

        .plb__nav--prev {
          left: calc(50% - 60px);
        }

        .plb__nav--next {
          right: calc(50% - 60px);
        }
      }

      @keyframes plbFade {
        from {
          opacity: 0;
        }
      }

      @keyframes plbZoom {
        from {
          opacity: 0;
          transform: scale(0.96);
        }
      }
    `,
  ],
})
export class PhotoLightbox implements AfterViewInit, OnDestroy {
  @Input({ required: true }) photos: FestivalPhoto[] = [];
  /** Names the dialog for screen readers, e.g. "This Year's Ganesh". */
  @Input() title = 'Photo';

  @Input({ required: true })
  set startIndex(value: number) {
    this.index.set(value);
  }

  @Output() closed = new EventEmitter<void>();

  readonly index = signal(0);
  readonly photo = computed(() => this.photos[this.index()] ?? null);

  private closeBtn = viewChild<ElementRef<HTMLButtonElement>>('closeBtn');
  private returnFocus: Element | null = null;
  private touchX = 0;

  ngAfterViewInit(): void {
    this.returnFocus = document.activeElement;
    document.body.style.overflow = 'hidden';
    this.closeBtn()?.nativeElement.focus();
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
    (this.returnFocus as HTMLElement | null)?.focus?.();
  }

  go(delta: number): void {
    const count = this.photos.length;
    if (count > 1) this.index.set((this.index() + delta + count) % count);
  }

  onBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.closed.emit();
  }

  onTouchStart(event: TouchEvent): void {
    this.touchX = event.changedTouches[0].clientX;
  }

  onTouchEnd(event: TouchEvent): void {
    const dx = event.changedTouches[0].clientX - this.touchX;
    if (Math.abs(dx) > 50) this.go(dx < 0 ? 1 : -1);
  }

  @HostListener('document:keydown', ['$event'])
  onKey(event: KeyboardEvent): void {
    if (event.key === 'Escape') this.closed.emit();
    else if (event.key === 'ArrowRight') this.go(1);
    else if (event.key === 'ArrowLeft') this.go(-1);
  }
}
