export interface Event {
  eventId: number;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  /** ISO date-time. */
  startDate: string;
  /** ISO date-time. */
  endDate: string;
  /** Human-readable slot, e.g. "6:00 PM – 9:00 PM". */
  time?: string;
  /** e.g. "Puja", "Cultural", "Seva", "Procession". */
  category?: string;
  /** Featured events lead the listing and fill the home-page preview. */
  featured?: boolean;
  /** When true the card shows a Register button that opens the WhatsApp flow. */
  registrationEnabled?: boolean;
  isActive: boolean;
  createdBy: number;
  createdOn: string;
  updatedBy: number;
  updatedOn: string;
}
