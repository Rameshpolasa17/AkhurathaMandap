/**
 * SINGLE SOURCE OF TRUTH for site-wide configuration.
 *
 * Everything a site owner needs to change lives here — none of these values
 * are duplicated anywhere else in the project.
 */

/**
 * FEATURE FLAG — Kids Zone.
 *
 * `false` hides the whole Kids section from the public site: header nav,
 * mobile menu, home page, footer, previews, cards and links. The Kids
 * components, services, models, routes and assets all stay in the codebase
 * untouched.
 *
 * Set this to `true` to bring the Kids Zone back. Nothing else needs editing.
 */
export const KIDS_ENABLED = false;

/**
 * FEATURE FLAG — Scan & Support QR.
 *
 * `false` hides the UPI QR section wherever it appears: the home page and the
 * Support page. The `SupportQr` component, the QR image and the /support route
 * all stay exactly where they are — only the section is kept off the page.
 *
 * Set this to `true` to show the QR again. Nothing else needs editing.
 */
export const SUPPORT_QR_ENABLED = false;

/**
 * GANESH REVEAL — the evening darshan moment on the home page.
 *
 * All times are India time (IST, UTC+05:30 — India has no daylight saving, so
 * the offset never changes). The visitor's own clock decides *when* "now" is,
 * but the moment itself is always `revealTime` in India, wherever they are.
 *
 *   before `revealDate`                      → nothing is shown
 *   on `revealDate`, before `revealTime`     → "A Divine Reveal Awaits" + countdown
 *   from `revealTime` to end of `showUntilDate` → the Ganesh Darshan section
 *   after `showUntilDate`                    → nothing is shown
 *
 * The switch happens on its own at `revealTime` — no refresh needed.
 *
 * To keep the darshan up only on the reveal day itself, set `showUntilDate`
 * to the same value as `revealDate`.
 */
export interface GaneshRevealConfig {
  /** Master switch. `false` removes the section entirely. */
  enabled: boolean;
  /** Reveal day in India, `YYYY-MM-DD`. */
  revealDate: string;
  /** Reveal time in India, 24-hour `HH:mm`. */
  revealTime: string;
  /** Last day (India) the revealed darshan stays on the page, `YYYY-MM-DD`. */
  showUntilDate: string;
  image: {
    /**
     * The reveal photograph. Drop the file at `src/assets/images/` with this
     * name — it is served from `assets/images/`. Until it exists, a branded
     * placeholder tile is drawn instead of a broken image.
     */
    src: string;
    /**
     * Optional responsive variants, e.g.
     * `'assets/images/ganesh-reveal-640.webp 640w, assets/images/ganesh-reveal.webp 1200w'`.
     * Leave empty to serve `src` alone. Only list files that actually exist.
     */
    srcset: string;
    /** Intrinsic pixel size of `src`. The frame is a fixed 4:5 arch either way. */
    width: number;
    height: number;
    /** Which part of the photo stays in frame when it is cropped to 4:5. */
    focus: string;
    alt: string;
  };
}

export const GANESH_REVEAL: GaneshRevealConfig = {
  enabled: false,
  revealDate: '2026-09-13',
  revealTime: '18:00',
  showUntilDate: '2026-09-25',
  image: {
    src: 'assets/images/ganesh-reveal.webp',
    srcset:
      'assets/images/ganesh-reveal-560.webp 560w, ' +
      'assets/images/ganesh-reveal-800.webp 800w, ' +
      'assets/images/ganesh-reveal.webp 1144w',
    width: 1144,
    height: 1375,
    focus: 'center 30%',
    alt: 'Shree Ganesh seated on a tiger, holding a conch and an axe, blessing devotees — Akhuratha Mandap Ganesh Darshan',
  },
};

export interface SocialLink {
  label: string;
  icon: string;
  url: string;
}

export interface AppConfig {
  mandapName: string;
  festivalName: string;
  tagline: string;
  rajaTitle: string;
  whatsappNumber: string;
  contact: {
    addressLines: string[];
    city: string;
    phone: string;
    email: string;
    officeHours: string;
    mapsUrl: string;
  };
  social: SocialLink[];
  festivalStartDate: string;
  supportQrImage: string;
  live: {
    streamUrl: string;
    channelUrl: string;
  };
}

export const APP_CONFIG: AppConfig = {
  /** Festival / organisation identity. */
  mandapName: 'Akhuratha Mandap',
  festivalName: 'Ganesh Mahotsav',
  tagline: 'Devotion • Culture • Community',

  /**
   * The mandap's honorific, shown in the hero in place of the countdown once
   * the timer reaches zero and the festival is under way.
   */
  rajaTitle: 'Siricilla Ka Raja',

  /**
   * Mandap WhatsApp number: 90328 31464.
   *
   * Stored in international format (91 = India) without '+' or spaces, which
   * is what wa.me requires — a bare 10-digit number does not resolve.
   * Every WhatsApp action on the site reads this one value: event
   * registration, competition registration and Send Us a Message.
   */
  whatsappNumber: '919032831464',

  /**
   * Mandap contact details. Rendered on the Contact page, the Location
   * section and in the footer — this is the only place they are defined.
   */
  contact: {
    addressLines: ['Akhuratha Mandap', 'Siricilla, Telangana'],
    /** Short form shown on the location card. */
    city: 'Siricilla, Telangana',
    phone: '+91 90328 31464',
    email: 'akhurathamandap1@gmail.com',
    officeHours: '6:00 AM – 9:00 PM (during the festival)',
    /** Opens the mandap's pin in Google Maps from the "Get Directions" button. */
    mapsUrl: 'https://maps.app.goo.gl/ZCzoxW89dntNRijy6',
  },

  /**
   * TODO(owner): add real profile URLs. Entries with an empty `url`
   * are automatically hidden — no dead social icons are rendered.
   */
  social: [
    { label: 'Facebook', icon: 'fa-brands fa-facebook-f', url: '' },
    { label: 'Instagram', icon: 'fa-brands fa-instagram', url: '' },
    { label: 'YouTube', icon: 'fa-brands fa-youtube', url: '' },
  ],

  /** Countdown target for the hero banner. */
  festivalStartDate: '2026-09-14T06:00:00',

  /** UPI donation QR shown in the Support section. */
  supportQrImage: 'assets/images/qr.png',

  /**
   * Live darshan stream. Leave `streamUrl` empty until a real stream exists —
   * the Live page then shows "Live updates coming soon." instead of a fake player.
   */
  live: {
    streamUrl: '',
    channelUrl: '',
  },
};

/** Social links that have actually been configured. */
export function activeSocialLinks(): SocialLink[] {
  return APP_CONFIG.social.filter((s) => s.url.trim().length > 0);
}

/** `tel:` href built from the configured phone number. */
export function telHref(): string {
  return `tel:${APP_CONFIG.contact.phone.replace(/[^\d+]/g, '')}`;
}

/** `mailto:` href built from the configured email address. */
export function mailHref(): string {
  return `mailto:${APP_CONFIG.contact.email}`;
}

/** True once a real WhatsApp number has been configured. */
export function isWhatsappConfigured(): boolean {
  return /^\d{8,15}$/.test(APP_CONFIG.whatsappNumber);
}
