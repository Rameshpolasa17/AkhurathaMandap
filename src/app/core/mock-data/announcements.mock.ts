import { APP_CONFIG } from '../config/app.config';
import { Announcement } from '../models/announcement';

/**
 * Notice board.
 *
 * These mirror the festival programme in `events.mock.ts` — Ganga Harathi,
 * Laddu Velam and the Lucky Draw — so the announcements never drift away from
 * what is actually happening. Only confirmed dates and timings appear here.
 *
 * Dates derive from `APP_CONFIG.festivalStartDate`, the same source the events
 * and schedule use.
 */
const start = new Date(APP_CONFIG.festivalStartDate);
const YEAR = start.getFullYear();
const MONTH = start.getMonth();

const on = (day: number, hour = 9) =>
  new Date(YEAR, MONTH, day, hour, 0, 0).toISOString();

/** Published a week before the festival opens. */
const PUBLISHED = on(7);
/** Notices stay up until the day after Nimarjanam. */
const EXPIRES = on(26);

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    announcementId: 1,
    title: 'Ganga Harathi — every evening, 14th to 25th',
    description:
      'The Ganga Harathi is performed at the mandap every evening of the festival, from the 14th through the 25th, between 7:30 PM and 8:30 PM. Everyone is welcome to join.',
    imageUrl: 'assets/images/ganaga harti.jpg',
    category: 'Ganga Harathi',
    publishDate: PUBLISHED,
    expiryDate: EXPIRES,
    isActive: true,
    createdBy: 1,
    createdOn: PUBLISHED,
    updatedBy: null,
    updatedOn: null,
  },
  {
    announcementId: 2,
    title: 'Laddu Velam on the 24th, from 7:00 PM',
    description:
      'The traditional laddu auction takes place at the mandap on the 24th, starting at 7:00 PM. Register on WhatsApp from the Events page if you would like to take part.',
    imageUrl: 'assets/images/IMG_20250906_002957.jpg',
    category: 'Laddu Velam',
    publishDate: PUBLISHED,
    expiryDate: on(25),
    isActive: true,
    createdBy: 1,
    createdOn: PUBLISHED,
    updatedBy: null,
    updatedOn: null,
  },
  {
    announcementId: 3,
    title: 'Lucky Draw on the 25th',
    description:
      'The mandap Lucky Draw is held on the 25th. Entries can be registered on WhatsApp from the Events page.',
    imageUrl: 'assets/images/IMG_20250905_223932.jpg',
    category: 'Lucky Draw',
    publishDate: PUBLISHED,
    expiryDate: on(26),
    isActive: true,
    createdBy: 1,
    createdOn: PUBLISHED,
    updatedBy: null,
    updatedOn: null,
  },
];
