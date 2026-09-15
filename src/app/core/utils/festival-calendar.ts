import { APP_CONFIG } from '@core/config/app.config';
import { Event } from '@core/models/event';

/**
 * "Add to calendar" and "share" helpers for festival events.
 *
 * Every event time on this site is an India wall-clock time. The mock data
 * builds dates with the browser's local clock, so the local date parts are
 * read back and re-anchored to IST (UTC+05:30, no daylight saving). That way a
 * devotee abroad still gets the Ganga Harathi at 7:30 PM *India* time.
 */

const IST_OFFSET_MIN = 330;
const DAY_MS = 86_400_000;
const REMINDER_MINUTES = 30;

export interface CalendarEntry {
  uid: string;
  title: string;
  description: string;
  location: string;
  /** First occurrence, as absolute instants. */
  start: Date;
  end: Date;
  /** Set for events that repeat every evening (e.g. Ganga Harathi). */
  dailyCount?: number;
}

/** The authored India wall-clock parts of an event date. */
function wallClock(iso: string) {
  const d = new Date(iso);
  return {
    y: d.getFullYear(),
    m: d.getMonth(),
    day: d.getDate(),
    h: d.getHours(),
    min: d.getMinutes(),
  };
}

/** India wall-clock parts → the real instant. */
function istInstant(p: { y: number; m: number; day: number; h: number; min: number }): Date {
  return new Date(Date.UTC(p.y, p.m, p.day, p.h, p.min) - IST_OFFSET_MIN * 60_000);
}

/** Daily events repeat from their start day to their end day. */
export function isDaily(event: Event): boolean {
  return (event.category ?? '').toLowerCase() === 'daily';
}

export function calendarEntryFor(event: Event): CalendarEntry {
  const s = wallClock(event.startDate);
  const e = wallClock(event.endDate);
  const start = istInstant(s);
  const location = `${event.location}, ${APP_CONFIG.contact.city}`;

  if (isDaily(event)) {
    // One evening's slot (start time → end time on the same day), repeated.
    const firstEnd = istInstant({ ...s, h: e.h, min: e.min });
    const days =
      Math.round((Date.UTC(e.y, e.m, e.day) - Date.UTC(s.y, s.m, s.day)) / DAY_MS) + 1;
    return {
      uid: `event-${event.eventId}`,
      title: `${event.title} — ${APP_CONFIG.mandapName}`,
      description: event.description,
      location,
      start,
      end: firstEnd,
      dailyCount: Math.max(1, days),
    };
  }

  return {
    uid: `event-${event.eventId}`,
    title: `${event.title} — ${APP_CONFIG.mandapName}`,
    description: event.description,
    location,
    start,
    end: istInstant(e),
  };
}

/** `20260914T140000Z` */
function utcStamp(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

export function googleCalendarUrl(entry: CalendarEntry): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: entry.title,
    dates: `${utcStamp(entry.start)}/${utcStamp(entry.end)}`,
    details: `${entry.description}\n\n${siteUrl('/events')}`,
    location: entry.location,
    ctz: 'Asia/Kolkata',
  });
  if (entry.dailyCount) {
    params.set('recur', `RRULE:FREQ=DAILY;COUNT=${entry.dailyCount}`);
  }
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Escapes text for an iCalendar property value. */
function icsText(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
}

/** Folds long lines as RFC 5545 asks (continuation lines start with a space). */
function fold(line: string): string {
  const parts: string[] = [];
  for (let i = 0; i < line.length; i += 60) parts.push(line.slice(i, i + 60));
  return parts.join('\r\n ');
}

export function icsContent(entry: CalendarEntry): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Akhuratha Mandap//Ganesh Mahotsav//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${entry.uid}-${utcStamp(entry.start)}@akhuratha-mandap`,
    `DTSTAMP:${utcStamp(new Date())}`,
    `DTSTART:${utcStamp(entry.start)}`,
    `DTEND:${utcStamp(entry.end)}`,
    ...(entry.dailyCount ? [`RRULE:FREQ=DAILY;COUNT=${entry.dailyCount}`] : []),
    `SUMMARY:${icsText(entry.title)}`,
    `DESCRIPTION:${icsText(`${entry.description}\n\n${siteUrl('/events')}`)}`,
    `LOCATION:${icsText(entry.location)}`,
    `URL:${siteUrl('/events')}`,
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    `DESCRIPTION:${icsText(entry.title)}`,
    `TRIGGER:-PT${REMINDER_MINUTES}M`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return lines.map(fold).join('\r\n') + '\r\n';
}

/** Saves the entry as an .ics file — phones open it straight in their calendar. */
export function downloadIcs(entry: CalendarEntry, fileName: string): void {
  const blob = new Blob([icsContent(entry)], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.ics`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* ------------------------------------------------------------------ share */

/** Absolute link to a page on this site, whatever domain it is served from. */
export function siteUrl(path: string): string {
  const origin = typeof location !== 'undefined' ? location.origin : '';
  return `${origin}${path}`;
}

/** `https://wa.me/?text=…` lets the devotee pick who to send it to. */
export function whatsAppShareUrl(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message.trim())}`;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * "15 Sep", "Tue, 15 Sep" or "15 Sep 2026" — spelled out by hand because
 * browsers disagree on short month names (some print "Sept").
 */
export function formatDate(
  isoDate: string,
  options: { weekday?: boolean; year?: boolean } = {},
): string {
  const [y, m, d] = isoDate.slice(0, 10).split('-').map(Number);
  const weekday = WEEKDAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  return `${options.weekday ? weekday + ', ' : ''}${d} ${MONTHS[m - 1]}${options.year ? ' ' + y : ''}`;
}

const pad = (n: number) => String(n).padStart(2, '0');
const dayMonth = (p: { y: number; m: number; day: number }, withWeekday: boolean) =>
  formatDate(`${p.y}-${pad(p.m + 1)}-${pad(p.day)}`, { weekday: withWeekday });

/** "Every evening, 14–25 Sep" or "Thu, 24 Sep". */
export function eventWhenText(event: Event): string {
  const s = wallClock(event.startDate);
  if (isDaily(event)) {
    const e = wallClock(event.endDate);
    const month = dayMonth(e, false).replace(/^\d+\s*/, '');
    return `Every evening, ${s.day}–${e.day} ${month}`;
  }
  return dayMonth(s, true);
}

export function eventShareMessage(event: Event): string {
  return [
    `🙏 *${event.title}* at ${APP_CONFIG.mandapName}`,
    '',
    `📅 ${[eventWhenText(event), event.time].filter(Boolean).join(' · ')}`,
    `📍 ${event.location}, ${APP_CONFIG.contact.city}`,
    '',
    event.description,
    '',
    `Details: ${siteUrl('/events')}`,
    '',
    'Ganpati Bappa Morya!',
  ].join('\n');
}
