import { Competition } from '../models/competition';

/**
 * Festival competitions.
 *
 * Only the Video Editing Competition is running this year. The architecture is
 * unchanged, so adding another competition is just another object in this
 * array — the filter bar, cards and WhatsApp registration all read from here.
 *
 * `date` and `time` are left empty because they have not been announced; the
 * card hides those rows rather than showing a placeholder. Set
 * `registrationEnabled: false` to show a card without a Register button.
 */
export const MOCK_COMPETITIONS: Competition[] = [
  {
    competitionId: 1,
    name: 'Video Editing Competition',
    category: 'Creative',
    imageUrl: 'assets/images/IMG_20250901_210152.jpg',
    date: '',
    time: '',
    location: 'Akhuratha Mandap',
    description:
      'Edit your own video of the festival at Akhuratha Mandap — the idol, the harathi, the decorations or the celebration — and share it with the mandap. Register on WhatsApp and the committee will send you the submission details.',
    registrationEnabled: true,
    displayOrder: 1,
    isActive: true,
  },
];
