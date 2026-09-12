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

export interface SocialLink {
  label: string;
  icon: string;
  url: string;
}

export interface AppConfig {
  mandapName: string;
  festivalName: string;
  tagline: string;
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
