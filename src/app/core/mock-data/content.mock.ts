import { Faq, FestivalStat, Highlight, Milestone } from '../models/content';

/**
 * Home-page highlight tiles — one per part of this year's festival.
 * Every tile routes somewhere real; nothing here is listed that is not on the
 * confirmed schedule.
 */
export const MOCK_HIGHLIGHTS: Highlight[] = [
  {
    title: 'Ganga Harathi',
    description: 'Every evening from the 14th to the 24th, 7:30 PM to 8:30 PM.',
    icon: 'fa-solid fa-fire',
    route: '/festival-schedule',
  },
  {
    title: 'First Pooja',
    description: 'Ganesh Chaturthi at the mandap — the festival opens on the 14th.',
    icon: 'fa-solid fa-hands-praying',
    route: '/events',
  },
  {
    title: 'Laddu Velam',
    description: 'The traditional laddu auction on the 23rd, from 7:00 PM.',
    icon: 'fa-solid fa-gift',
    route: '/events',
  },
  {
    title: 'Lucky Draw',
    description: 'The mandap lucky draw, held on the 23rd.',
    icon: 'fa-solid fa-ticket',
    route: '/events',
  },
  {
    title: 'Nimarjanam',
    description: 'The farewell procession and immersion on the 24th.',
    icon: 'fa-solid fa-water',
    route: '/festival-schedule',
  },
  {
    title: 'Festival Gallery',
    description: 'Photographs from the mandap, through the years.',
    icon: 'fa-solid fa-images',
    route: '/gallery',
  },
];

/** About / History timeline. */
export const MOCK_MILESTONES: Milestone[] = [
  {
    year: 'The Beginning',
    title: 'A street celebration',
    description:
      'A handful of families set up a small pandal on the street and installed the first idol together.',
  },
  {
    year: 'Growing Roots',
    title: 'The mandap takes shape',
    description:
      'A formal committee was formed, and the festival grew to eleven days with a daily aarti schedule.',
  },
  {
    year: 'Seva First',
    title: 'Annadanam begins',
    description:
      'The mandap started serving mahaprasad to every visitor — now one of the largest sevas of the festival.',
  },
  {
    year: 'For the Community',
    title: 'Competitions & culture',
    description:
      'Art, rangoli, dance and devotional competitions opened the festival to families across the neighbourhood.',
  },
  {
    year: 'Today',
    title: 'A neighbourhood tradition',
    description:
      'Hundreds of volunteers, thousands of devotees, and the same devotion the mandap started with.',
  },
];

/** Headline numbers, taken straight from this year's confirmed schedule. */
export const MOCK_STATS: FestivalStat[] = [
  { value: '11', label: 'Days of celebration' },
  { value: 'Daily', label: 'Ganga Harathi, 7:30 PM' },
  { value: '23rd', label: 'Laddu Velam & Lucky Draw' },
  { value: '24th', label: 'Nimarjanam' },
];

export const MOCK_FAQS: Faq[] = [
  {
    faqId: 1,
    question: 'What are the darshan timings?',
    answer:
      'The mandap is open from 6:00 AM to 9:00 PM every day of the festival. Aarti is performed at 6:30 AM, 12:00 PM and 7:30 PM.',
    category: 'General',
  },
  {
    faqId: 2,
    question: 'Is there an entry fee?',
    answer: 'No. Darshan, prasad and every programme at the mandap are free and open to all.',
    category: 'General',
  },
  {
    faqId: 3,
    question: 'How do I register for an event or competition?',
    answer:
      'Open the Events or Competitions page, choose a card and use the Register button. The form opens WhatsApp with your details filled in — send the message and the committee will confirm your slot.',
    category: 'Events',
  },
  {
    faqId: 4,
    question: 'Is there an age limit for competitions?',
    answer:
      'Most competitions run in age groups, listed on each competition card. Rangoli and idol making are open to all ages.',
    category: 'Competitions',
  },
  {
    faqId: 5,
    question: 'Can I volunteer with the mandap?',
    answer:
      'Yes. Send us a message from the Contact page mentioning the team you would like to join — decoration, annadanam, darshan, cultural, procession or cleanliness.',
    category: 'General',
  },
  {
    faqId: 6,
    question: 'How can I support the mandap?',
    answer:
      'Volunteer your time during the festival, sponsor a programme, or contribute in kind — flowers, groceries, lighting and sound are all welcome. Send us a message and the committee will take it from there.',
    category: 'Support',
  },
  {
    faqId: 7,
    question: 'Is mahaprasad served every day?',
    answer:
      'Prasad is distributed after each aarti. The full mahaprasad (annadanam) is served on the dedicated seva day listed in the festival schedule.',
    category: 'General',
  },
  {
    faqId: 8,
    question: 'Where does the visarjan procession go?',
    answer:
      'The miravnuk departs from the mandap gate in the late afternoon of the final day and proceeds to the river ghat, where the final aarti and immersion take place.',
    category: 'Events',
  },
];
