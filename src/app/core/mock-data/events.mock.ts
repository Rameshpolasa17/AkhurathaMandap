import { APP_CONFIG } from '../config/app.config';
import { Event } from '../models/event';

/**
 * The mandap's festival programme.
 *
 * Dates are derived from `APP_CONFIG.festivalStartDate` so the month and year
 * live in one place — change the config and the whole programme moves with it.
 * Images are real photographs from `src/assets/images/`, matched to what each
 * event actually is.
 */
const start = new Date(APP_CONFIG.festivalStartDate);
const YEAR = start.getFullYear();
const MONTH = start.getMonth();

/** Local date at a given day-of-month and time, as an ISO string. */
const at = (day: number, hour = 0, minute = 0) =>
  new Date(YEAR, MONTH, day, hour, minute, 0).toISOString();

export const MOCK_EVENTS: Event[] = [
  {
    eventId: 1,
    title: 'First Pooja',
    description:
      'Ganesh Chaturthi at Akhuratha Mandap — the idol is installed and the first pooja of the festival is offered.',
    location: 'Akhuratha Mandap',
    imageUrl: 'assets/images/IMG_20250903_153924.jpg',
    startDate: at(14, 9),
    endDate: at(14, 12),
    category: 'Pooja',
    featured: true,
    registrationEnabled: false,
    isActive: true,
    createdBy: 1,
    createdOn: at(1),
    updatedBy: 1,
    updatedOn: at(1),
  },
  {
    eventId: 2,
    title: 'Ganga Harathi',
    description:
      'The evening harathi, performed every day of the festival from the 14th through the 25th.',
    location: 'Akhuratha Mandap',
    imageUrl: 'assets/images/ganaga harti.jpg',
    startDate: at(14, 19, 30),
    endDate: at(25, 20, 30),
    time: '7:30 PM – 8:30 PM',
    category: 'Daily',
    featured: true,
    registrationEnabled: false,
    isActive: true,
    createdBy: 1,
    createdOn: at(1),
    updatedBy: 1,
    updatedOn: at(1),
  },
  {
    eventId: 3,
    title: 'Laddu Velam',
    description: 'The traditional laddu auction at the mandap.',
    location: 'Akhuratha Mandap',
    imageUrl: 'assets/images/IMG_20250906_002957.jpg',
    startDate: at(24, 19),
    endDate: at(24, 22),
    time: 'Starts at 7:00 PM',
    category: 'Celebration',
    featured: true,
    registrationEnabled: true,
    isActive: true,
    createdBy: 1,
    createdOn: at(1),
    updatedBy: 1,
    updatedOn: at(1),
  },
  {
    eventId: 4,
    title: 'Roshans',
    description: 'Roshans at the mandap on the 24th.',
    location: 'Akhuratha Mandap',
    imageUrl: 'assets/images/IMG_20250901_210152.jpg',
    startDate: at(24, 19),
    endDate: at(24, 23),
    category: 'Celebration',
    featured: false,
    registrationEnabled: false,
    isActive: true,
    createdBy: 1,
    createdOn: at(1),
    updatedBy: 1,
    updatedOn: at(1),
  },
  {
    eventId: 5,
    title: 'Lucky Draw',
    description: 'The mandap lucky draw, held on the 25th.',
    location: 'Akhuratha Mandap',
    imageUrl: 'assets/images/IMG_20250905_223932.jpg',
    startDate: at(25, 19),
    endDate: at(25, 23),
    category: 'Celebration',
    featured: false,
    registrationEnabled: true,
    isActive: true,
    createdBy: 1,
    createdOn: at(1),
    updatedBy: 1,
    updatedOn: at(1),
  },
  {
    eventId: 6,
    title: 'Nimarjanam',
    description: 'The farewell procession and immersion on the 25th, the final day of the festival.',
    location: 'From Akhuratha Mandap',
    imageUrl: 'assets/images/IMG_20250907_044558.jpg',
    startDate: at(25, 9),
    endDate: at(25, 23),
    category: 'Procession',
    featured: true,
    registrationEnabled: false,
    isActive: true,
    createdBy: 1,
    createdOn: at(1),
    updatedBy: 1,
    updatedOn: at(1),
  },
];
