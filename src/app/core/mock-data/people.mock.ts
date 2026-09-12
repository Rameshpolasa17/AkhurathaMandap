import { CommitteeMember, Volunteer } from '../models/people';

/**
 * Committee and volunteer directory.
 * Photos live under `src/assets/images/committee/` and
 * `src/assets/images/volunteers/`; missing files fall back to an initials tile.
 */
export const MOCK_COMMITTEE: CommitteeMember[] = [
  {
    memberId: 1,
    name: 'Committee President',
    designation: 'President',
    imageUrl: 'assets/images/committee/president.jpg',
    description: 'Leads the mandap trust and oversees the festival programme.',
    displayOrder: 1,
  },
  {
    memberId: 2,
    name: 'Committee Secretary',
    designation: 'Secretary',
    imageUrl: 'assets/images/committee/secretary.jpg',
    description: 'Coordinates permissions, scheduling and day-to-day operations.',
    displayOrder: 2,
  },
  {
    memberId: 3,
    name: 'Committee Treasurer',
    designation: 'Treasurer',
    imageUrl: 'assets/images/committee/treasurer.jpg',
    description: 'Manages contributions, accounts and the annual statement.',
    displayOrder: 3,
  },
  {
    memberId: 4,
    name: 'Cultural Head',
    designation: 'Cultural Committee',
    imageUrl: 'assets/images/committee/cultural-head.jpg',
    description: 'Curates the cultural evenings, competitions and stage programme.',
    displayOrder: 4,
  },
  {
    memberId: 5,
    name: 'Seva Head',
    designation: 'Annadanam & Seva',
    imageUrl: 'assets/images/committee/seva-head.jpg',
    description: 'Runs the mahaprasad kitchen and the daily prasad distribution.',
    displayOrder: 5,
  },
  {
    memberId: 6,
    name: 'Decoration Head',
    designation: 'Decoration Committee',
    imageUrl: 'assets/images/committee/decoration-head.jpg',
    description: 'Designs the pandal, the floral backdrop and the lighting.',
    displayOrder: 6,
  },
];

export const MOCK_VOLUNTEERS: Volunteer[] = [
  {
    volunteerId: 1,
    name: 'Decoration Team',
    role: 'Pandal & Décor',
    imageUrl: 'assets/images/IMG_20250906_143655.jpg',
    description:
      'Builds the pandal, arranges the floral work and sets up the lighting before Sthapana.',
    displayOrder: 1,
  },
  {
    volunteerId: 2,
    name: 'Annadanam Team',
    role: 'Prasad & Kitchen',
    imageUrl: 'assets/images/volunteers/annadanam-team.jpg',
    description: 'Cooks and serves mahaprasad to every devotee who visits the mandap.',
    displayOrder: 2,
  },
  {
    volunteerId: 3,
    name: 'Darshan Team',
    role: 'Queue & Crowd Care',
    imageUrl: 'assets/images/IMG_20250906_002957.jpg',
    description: 'Manages the darshan queue and looks after elderly and differently-abled visitors.',
    displayOrder: 3,
  },
  {
    volunteerId: 4,
    name: 'Cultural Team',
    role: 'Stage & Programme',
    imageUrl: 'assets/images/volunteers/cultural-team.jpg',
    description: 'Runs the stage, sound and scheduling for every cultural programme.',
    displayOrder: 4,
  },
  {
    volunteerId: 5,
    name: 'Procession Team',
    role: 'Miravnuk',
    imageUrl: 'assets/images/IMG_20250906_205449.jpg',
    description: 'Organises the visarjan route, the dhol-tasha pathak and safety marshals.',
    displayOrder: 5,
  },
  {
    volunteerId: 6,
    name: 'Cleanliness Team',
    role: 'Swachhata Seva',
    imageUrl: 'assets/images/volunteers/cleanliness-team.jpg',
    description: 'Keeps the mandap and the surrounding streets clean throughout the festival.',
    displayOrder: 6,
  },
];
