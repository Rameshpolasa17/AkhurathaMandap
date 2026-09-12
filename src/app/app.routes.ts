import { Routes } from '@angular/router';

import { PublicLayout } from './layouts/public-layout/public-layout';
import { adminRoutes } from './admin/admin.routes';
import { kidsGuard } from '@core/guards/kids-guard';

// Public pages
import { Home } from './features/home/home';
import { About } from './features/about/about';
import { History } from './features/history/history';
import { Events } from './features/events/events/events';
import { FestivalSchedule } from './features/festival-schedule/festival-schedule/festival-schedule';
import { Gallery } from './features/gallery/gallery/gallery';
import { Competitions } from './features/competitions/competitions/competitions';
import { Sponsors } from './features/sponsors/sponsors/sponsors';
import { Volunteers } from './features/volunteers/volunteers';
import { CommitteePage } from './features/committee/committee';
import { Support } from './features/support/support';
import { Contact } from './features/contact/contact/contact';
import { FaqPage } from './features/faq/faq';
import { Announcements } from './features/announcements/announcements/announcements';
import { Live } from './features/live/live/live';

const suffix = ' | Akhuratha Mandap';

/**
 * Kids Zone routes.
 *
 * `kidsGuard` sends visitors home while `KIDS_ENABLED` is false, so the whole
 * section is unreachable without deleting anything. Setting KIDS_ENABLED to
 * true in `core/config/app.config.ts` reopens every route below and restores
 * the Kids links in the header, mobile menu, home page and footer.
 *
 * Every component here is lazy-loaded, so while the section is hidden none of
 * this code is downloaded by visitors — but all of it stays in the repository.
 */
const kidsRoutes: Routes = [
  {
    path: 'kids',
    title: 'Kids Zone' + suffix,
    loadComponent: () => import('./features/kids/kids/kids').then((m) => m.Kids),
  },
  {
    path: 'kids/drawing',
    title: 'Drawing' + suffix,
    loadComponent: () => import('./features/kids/drawing/drawing').then((m) => m.Drawing),
  },
  {
    path: 'kids/stories',
    title: 'Story Telling' + suffix,
    loadComponent: () => import('./features/kids/stories/stories').then((m) => m.Stories),
  },
  {
    path: 'kids/bhajans',
    title: 'Bhajans' + suffix,
    loadComponent: () => import('./features/kids/bhajans/bhajans').then((m) => m.Bhajans),
  },
  {
    path: 'kids/puzzle-games',
    title: 'Puzzle Games' + suffix,
    loadComponent: () =>
      import('./features/kids/puzzle-games/puzzle-games').then((m) => m.PuzzleGames),
  },
  {
    path: 'kids/dance',
    title: 'Dance' + suffix,
    loadComponent: () => import('./features/kids/dance/dance').then((m) => m.Dance),
  },
  {
    path: 'kids/fancy-dress',
    title: 'Fancy Dress' + suffix,
    loadComponent: () =>
      import('./features/kids/fancy-dress/fancy-dress').then((m) => m.FancyDress),
  },
  {
    path: 'kids/quiz',
    title: 'Quiz' + suffix,
    loadComponent: () => import('./features/kids/quiz/quiz').then((m) => m.Quiz),
  },
  {
    path: 'kids/lucky-games',
    title: 'Lucky Games' + suffix,
    loadComponent: () =>
      import('./features/kids/lucky-games/lucky-games').then((m) => m.LuckyGames),
  },
  {
    path: 'kids/jigsaw',
    title: 'Jigsaw Puzzle' + suffix,
    loadComponent: () => import('./features/kids/jigsaw/jigsaw').then((m) => m.Jigsaw),
  },
  {
    path: 'kids/memory-game',
    title: 'Memory Game' + suffix,
    loadComponent: () =>
      import('./features/kids/memory-game/memory-game').then((m) => m.MemoryGame),
  },
  {
    path: 'kids/word-search',
    title: 'Word Search' + suffix,
    loadComponent: () =>
      import('./features/kids/word-search/word-search').then((m) => m.WordSearch),
  },
  {
    path: 'kids/match-shadow',
    title: 'Match Shadow' + suffix,
    loadComponent: () =>
      import('./features/kids/match-shadow/match-shadow').then((m) => m.MatchShadow),
  },
  {
    path: 'kids/guess-picture',
    title: 'Guess Picture' + suffix,
    loadComponent: () =>
      import('./features/kids/guess-picture/guess-picture').then((m) => m.GuessPicture),
  },
  {
    path: 'kids/certificate',
    title: 'Certificate' + suffix,
    loadComponent: () =>
      import('./features/kids/certificate/certificate').then((m) => m.Certificate),
  },
  {
    path: 'kids/coloring-book',
    title: 'Coloring Book' + suffix,
    loadComponent: () =>
      import('./features/kids/coloring-book/coloring-book').then((m) => m.ColoringBook),
  },
].map((route) => ({ ...route, canActivate: [kidsGuard] }));

export const routes: Routes = [
  // Admin area (separate layout, own guard).
  ...adminRoutes,

  {
    path: '',
    component: PublicLayout,
    children: [
      { path: '', component: Home, title: 'Home' + suffix },

      { path: 'about', component: About, title: 'About' + suffix },
      { path: 'history', component: History, title: 'Our History' + suffix },

      { path: 'events', component: Events, title: 'Events' + suffix },
      {
        path: 'festival-schedule',
        component: FestivalSchedule,
        title: 'Festival Schedule' + suffix,
      },
      // Friendlier alias for the schedule.
      { path: 'schedule', redirectTo: 'festival-schedule', pathMatch: 'full' },

      { path: 'gallery', component: Gallery, title: 'Gallery' + suffix },
      // The old photo-gallery page duplicated the gallery; keep the link alive.
      { path: 'photo-gallery', redirectTo: 'gallery', pathMatch: 'full' },

      { path: 'competitions', component: Competitions, title: 'Competitions' + suffix },
      { path: 'sponsors', component: Sponsors, title: 'Sponsors' + suffix },
      { path: 'volunteers', component: Volunteers, title: 'Volunteers' + suffix },
      { path: 'committee', component: CommitteePage, title: 'Committee' + suffix },

      { path: 'support', component: Support, title: 'Support Us' + suffix },
      // The old donate URL now points at the QR-only support page.
      { path: 'donate', redirectTo: 'support', pathMatch: 'full' },

      { path: 'contact', component: Contact, title: 'Contact' + suffix },
      { path: 'faq', component: FaqPage, title: 'FAQ' + suffix },
      { path: 'announcements', component: Announcements, title: 'Announcements' + suffix },
      { path: 'live', component: Live, title: 'Live Darshan' + suffix },

      ...kidsRoutes,
    ],
  },

  { path: '**', redirectTo: '' },
];
