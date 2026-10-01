import { APP_CONFIG } from '@core/config/app.config';
import { Event } from '@core/models/event';

/** Sharing helpers: WhatsApp links and plain date formatting. */

/** Absolute link to a page on this site, whatever domain it is served from. */
export function siteUrl(path: string): string {
  const origin = typeof location !== 'undefined' ? location.origin : '';
  return `${origin}${path}`;
}

/** `https://wa.me/?text=…` lets the devotee pick who to send it to. */
export function whatsAppShareUrl(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message.trim())}`;
}

/** A ready-to-forward WhatsApp invitation for one event — venue, no dates. */
export function eventShareMessage(event: Event): string {
  return [
    `🙏 *${event.title}* at ${APP_CONFIG.mandapName}`,
    '',
    `📍 ${event.location}, ${APP_CONFIG.contact.city}`,
    '',
    event.description,
    '',
    `Details: ${siteUrl('/events')}`,
    '',
    'Ganpati Bappa Morya!',
  ].join('\n');
}
