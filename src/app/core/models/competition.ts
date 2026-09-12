export interface Competition {
  competitionId: number;
  name: string;
  /** e.g. "Art", "Cultural", "Devotional", "Community". */
  category: string;
  imageUrl: string;
  /** ISO date. */
  date: string;
  /** Human-readable slot, e.g. "4:00 PM – 6:00 PM". */
  time: string;
  location: string;
  description: string;
  /** Age band or eligibility note. Optional. */
  eligibility?: string;
  prizes?: string[];
  /** When true the card shows a Register button that opens the WhatsApp flow. */
  registrationEnabled: boolean;
  displayOrder: number;
  isActive: boolean;
}

export const COMPETITION_CATEGORIES = [
  'Art',
  'Cultural',
  'Devotional',
  'Community',
] as const;
