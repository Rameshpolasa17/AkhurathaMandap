import { APP_CONFIG } from '../config/app.config';
import { ScheduleDay } from '../models/schedule';

/**
 * The festival schedule.
 *
 * Only the dates and timings the mandap has confirmed appear here — nothing
 * is filled in or rounded out. Ganga Harathi runs every evening from the 14th
 * through the 25th and is shown separately on the schedule page as a standing
 * daily entry rather than repeated on each day.
 *
 * The month and year come from `APP_CONFIG.festivalStartDate`.
 */
const start = new Date(APP_CONFIG.festivalStartDate);
const YEAR = start.getFullYear();
const MONTH = start.getMonth();

const day = (d: number) => new Date(YEAR, MONTH, d, 0, 0, 0).toISOString();

/** Ganga Harathi — every evening of the festival. */
export const DAILY_HARATHI = {
  name: 'Ganga Harathi',
  time: '7:30 PM – 8:30 PM',
  note: 'Every evening, 14th through 25th',
  range: '14th – 25th',
};

export const MOCK_SCHEDULE: ScheduleDay[] = [
  {
    dayId: 1,
    label: '14th',
    date: day(14),
    title: 'Ganesh Chaturthi',
    summary: 'The festival opens with the First Pooja at the mandap.',
    highlight: true,
    items: [
      {
        time: '',
        title: 'First Pooja',
        location: 'Akhuratha Mandap',
        description: 'The first pooja of the festival.',
        icon: 'fa-solid fa-hands-praying',
      },
      {
        time: DAILY_HARATHI.time,
        title: DAILY_HARATHI.name,
        location: 'Akhuratha Mandap',
        description: 'The evening harathi begins today and runs every evening until the 25th.',
        icon: 'fa-solid fa-fire',
      },
    ],
  },
  {
    dayId: 2,
    label: '24th',
    date: day(24),
    title: 'Laddu Velam & Roshans',
    summary: 'The biggest evening of the festival at the mandap.',
    highlight: true,
    items: [
      {
        time: 'Starts from 7:00 PM',
        title: 'Laddu Velam',
        location: 'Akhuratha Mandap',
        description: 'The traditional laddu auction.',
        icon: 'fa-solid fa-gift',
      },
      {
        time: '',
        title: 'Roshans',
        location: 'Akhuratha Mandap',
        description: '',
        icon: 'fa-solid fa-lightbulb',
      },
      {
        time: DAILY_HARATHI.time,
        title: DAILY_HARATHI.name,
        location: 'Akhuratha Mandap',
        description: 'The daily evening harathi.',
        icon: 'fa-solid fa-fire',
      },
    ],
  },
  {
    dayId: 3,
    label: '25th',
    date: day(25),
    title: 'Lucky Draw & Nimarjanam',
    summary: 'The final day — the Lucky Draw, then the idol leaves the mandap for immersion.',
    highlight: true,
    items: [
      {
        time: '',
        title: 'Lucky Draw',
        location: 'Akhuratha Mandap',
        description: 'The mandap lucky draw.',
        icon: 'fa-solid fa-ticket',
      },
      {
        time: DAILY_HARATHI.time,
        title: DAILY_HARATHI.name,
        location: 'Akhuratha Mandap',
        description: 'The last evening harathi of the festival.',
        icon: 'fa-solid fa-fire',
      },
      {
        time: '',
        title: 'Nimarjanam',
        location: 'From Akhuratha Mandap',
        description: 'The farewell procession and immersion.',
        icon: 'fa-solid fa-water',
      },
    ],
  },
];
