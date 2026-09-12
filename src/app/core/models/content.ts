export interface Faq {
  faqId: number;
  question: string;
  answer: string;
  /** e.g. "General", "Events", "Competitions", "Support". */
  category: string;
}

/** A milestone on the About / History timeline. */
export interface Milestone {
  year: string;
  title: string;
  description: string;
}

/** A "what happens at the festival" tile on the home page. */
export interface Highlight {
  title: string;
  description: string;
  /** Font Awesome class. */
  icon: string;
  /** Route to open when the tile is activated. Required — no dead tiles. */
  route: string;
}

/** A headline number on the About page. */
export interface FestivalStat {
  value: string;
  label: string;
}
