import { KIDS_ENABLED } from './app.config';

export interface NavLink {
  label: string;
  route: string;
  /** Font Awesome class — used by the footer and mobile menu. */
  icon?: string;
  /**
   * When set, the link only appears while this flag is true.
   * Kids links carry `flag: 'kids'`, so flipping KIDS_ENABLED restores them
   * everywhere at once — header, mobile menu and footer.
   */
  flag?: 'kids';
  /** Only listed in the mobile menu — the desktop bar has no room left. */
  mobileOnly?: boolean;
}

/** Every flag the navigation can gate on. */
const FLAGS: Record<NonNullable<NavLink['flag']>, boolean> = {
  kids: KIDS_ENABLED,
};

/** Filters out links whose feature flag is currently off. */
export function visibleLinks(links: NavLink[]): NavLink[] {
  return links.filter((link) => !link.flag || FLAGS[link.flag]);
}

/** Primary header navigation. */
export const MAIN_NAV: NavLink[] = [
  { label: 'Home', route: '/', icon: 'fa-solid fa-house' },
  { label: 'About', route: '/about', icon: 'fa-solid fa-om' },
  { label: 'Events', route: '/events', icon: 'fa-solid fa-calendar-days' },
  { label: 'Schedule', route: '/festival-schedule', icon: 'fa-solid fa-clock' },
  { label: 'Aarti & Mantras', route: '/aarti', icon: 'fa-solid fa-om', mobileOnly: true },
  { label: 'Devotee Photo Wall', route: '/devotee-wall', icon: 'fa-solid fa-camera', mobileOnly: true },
  { label: 'Gallery', route: '/gallery', icon: 'fa-solid fa-images' },
  { label: 'Competitions', route: '/competitions', icon: 'fa-solid fa-trophy' },
  { label: 'Kids Zone', route: '/kids', icon: 'fa-solid fa-child-reaching', flag: 'kids' },
  { label: 'Sponsors', route: '/sponsors', icon: 'fa-solid fa-handshake' },
  { label: 'Contact', route: '/contact', icon: 'fa-solid fa-envelope' },
];

/** Footer — "Explore" column. */
export const FOOTER_EXPLORE: NavLink[] = [
  { label: 'Gallery', route: '/gallery' },
  { label: 'Devotee Photo Wall', route: '/devotee-wall' },
  { label: 'Aarti & Mantras', route: '/aarti' },
  { label: 'Events', route: '/events' },
  { label: 'Competitions', route: '/competitions' },
  { label: 'Festival Schedule', route: '/festival-schedule' },
  { label: 'Announcements', route: '/announcements' },
  { label: 'Kids Zone', route: '/kids', flag: 'kids' },
];

/** Footer — "The Mandap" column. */
export const FOOTER_MANDAP: NavLink[] = [
  { label: 'About Us', route: '/about' },
  { label: 'Our History', route: '/history' },
  { label: 'Committee', route: '/committee' },
  { label: 'Volunteers', route: '/volunteers' },
  { label: 'Sponsors', route: '/sponsors' },
  { label: 'FAQ', route: '/faq' },
];
