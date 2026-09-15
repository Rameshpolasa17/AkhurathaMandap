import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  inject,
  signal,
} from '@angular/core';

import { Event } from '@core/models/event';
import {
  calendarEntryFor,
  downloadIcs,
  googleCalendarUrl,
  isDaily,
} from '@core/utils/festival-calendar';

/**
 * "Add to calendar" for one festival event: Google Calendar (Android, web) or
 * an .ics file (iPhone, Outlook, everything else). Daily events such as the
 * Ganga Harathi are added as a repeating evening reminder, not one long block.
 */
@Component({
  selector: 'app-add-to-calendar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="atc" [class.is-up]="dropUp">
      <button
        type="button"
        class="akm-btn akm-btn--ghost akm-btn--sm atc__toggle"
        [attr.aria-expanded]="open()"
        [attr.aria-controls]="menuId"
        (click)="open.set(!open())"
      >
        <i class="fa-solid fa-calendar-plus" aria-hidden="true"></i>
        Add to Calendar
      </button>

      @if (open()) {
        <div class="atc__menu" [id]="menuId" role="menu">
          <a
            class="atc__item"
            role="menuitem"
            [href]="googleUrl"
            target="_blank"
            rel="noopener noreferrer"
            (click)="open.set(false)"
          >
            <i class="fa-brands fa-google" aria-hidden="true"></i>
            Google Calendar
          </a>
          <button type="button" class="atc__item" role="menuitem" (click)="saveIcs()">
            <i class="fa-brands fa-apple" aria-hidden="true"></i>
            iPhone / Outlook / Other
          </button>
          @if (daily) {
            <p class="atc__note">Adds a reminder for every evening.</p>
          } @else {
            <p class="atc__note">Includes a reminder 30 minutes before.</p>
          }
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }

      .atc {
        position: relative;
      }

      .atc__toggle {
        width: 100%;
      }

      .atc__menu {
        position: absolute;
        z-index: 30;
        top: calc(100% + 8px);
        left: 0;
        min-width: 230px;
        padding: 8px;
        border-radius: var(--akm-r-md);
        border: 1px solid var(--akm-border);
        background: var(--akm-white);
        box-shadow: var(--akm-shadow-lg);
        animation: atcIn 0.18s var(--akm-ease);
      }

      .is-up .atc__menu {
        top: auto;
        bottom: calc(100% + 8px);
      }

      .atc__item {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        padding: 11px 12px;
        border: 0;
        border-radius: var(--akm-r-sm);
        background: transparent;
        color: var(--akm-ink);
        font-size: 0.9rem;
        font-weight: 500;
        text-align: left;
        cursor: pointer;
      }

      .atc__item i {
        width: 18px;
        color: var(--akm-maroon-700);
        text-align: center;
      }

      .atc__item:hover,
      .atc__item:focus-visible {
        background: var(--akm-surface-tint);
      }

      .atc__note {
        margin: 4px 12px 2px;
        font-size: 0.76rem;
        color: var(--akm-ink-soft);
      }

      @keyframes atcIn {
        from {
          opacity: 0;
          transform: translateY(-4px);
        }
      }
    `,
  ],
})
export class AddToCalendar {
  private host = inject(ElementRef<HTMLElement>);

  private _event!: Event;

  @Input({ required: true })
  set event(value: Event) {
    this._event = value;
    this.googleUrl = googleCalendarUrl(calendarEntryFor(value));
    this.daily = isDaily(value);
    this.menuId = `atc-${value.eventId}`;
  }

  /** Open the menu upwards (for buttons near the bottom of a card). */
  @Input() dropUp = false;

  readonly open = signal(false);
  googleUrl = '';
  daily = false;
  menuId = 'atc';

  saveIcs(): void {
    downloadIcs(calendarEntryFor(this._event), `${this._event.title} akhuratha mandap`);
    this.open.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(e: MouseEvent): void {
    if (this.open() && !this.host.nativeElement.contains(e.target as Node)) {
      this.open.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.open.set(false);
  }
}
