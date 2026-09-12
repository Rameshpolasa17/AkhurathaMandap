import { Routes } from '@angular/router';

import { AdminLayout } from './layouts/admin-layout/admin-layout';

import { Login } from './features/auth/login/login';
import { Dashboard } from './features/dashboard/dashboard/dashboard';

import { Announcements } from './features/announcements/announcements/announcements';
import { Events } from './features/events/events/events';
import { GalleryComponent } from './features/gallery/gallery/gallery';
import { Videos } from './features/videos/videos/videos';
import { Sponsors } from './features/sponsors/sponsors/sponsors';
import { Competitions } from './features/competitions/competitions/competitions';
import { Contacts } from './features/contacts/contacts/contacts';
import { Settings } from './features/settings/settings/settings';
import { Users } from './features/users/users/users';
import { KidsDashboard } from './features/kids/kids-dashboard/kids-dashboard';

import { BhajanList } from './features/kids/bhajans/bhajan-list/bhajan-list';
import { BhajanForm } from './features/kids/bhajans/bhajan-form/bhajan-form';

import { MantraList } from './features/kids/mantras/mantra-list/mantra-list';
import { MantraForm } from './features/kids/mantras/mantra-form/mantra-form';

import { MorningPrayerList } from './features/kids/morning-prayers/morning-prayer-list/morning-prayer-list';
import { MorningPrayerForm } from './features/kids/morning-prayers/morning-prayer-form/morning-prayer-form';

import { RhymeList } from './features/kids/rhymes/rhyme-list/rhyme-list';
import { RhymeForm } from './features/kids/rhymes/rhyme-form/rhyme-form';

import { StoryList } from './features/kids/stories/story-list/story-list';
import { StoryForm } from './features/kids/stories/story-form/story-form';
import { StoryPages } from './features/kids/stories/story-pages/story-pages';

import { GameList } from './features/kids/games/game-list/game-list';
import { GameForm } from './features/kids/games/game-form/game-form';
import { GameItems } from './features/kids/games/game-items/game-items';

import { QuizList } from './features/kids/quiz/quiz-list/quiz-list';
import { QuizForm } from './features/kids/quiz/quiz-form/quiz-form';
import { QuizQuestions } from './features/kids/quiz/quiz-questions/quiz-questions';

import { CertificateList } from './features/kids/certificates/certificate-list/certificate-list';

import { CompetitionList } from './features/kids/competitions/competition-list/competition-list';
import { CompetitionForm } from './features/kids/competitions/competition-form/competition-form';
import { CompetitionCategories } from './features/kids/competitions/competition-categories/competition-categories';
import { CompetitionRegistrations } from './features/kids/competitions/competition-registrations/competition-registrations';
import { CompetitionResults } from './features/kids/competitions/competition-results/competition-results';
import { authGuard } from '@core/guards/auth-guard';
import { DrawingList } from './features/kids/drawing/drawing-list/drawing-list';
import { DrawingForm } from './features/kids/drawing/drawing-form/drawing-form';

export const adminRoutes: Routes = [
  {
    path: 'admin/login',
    component: Login,
  },
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'announcements',
        component: Announcements,
      },
      {
        path: 'events',
        component: Events,
      },
      {
        path: 'gallery',
        component: GalleryComponent,
      },
      {
        path: 'videos',
        component: Videos,
      },
      {
        path: 'sponsors',
        component: Sponsors,
      },
      {
        path: 'competitions',
        component: Competitions,
      },
      {
        path: 'contacts',
        component: Contacts,
      },
      {
        path: 'settings',
        component: Settings,
      },
      {
        path: 'users',
        component: Users,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'kids',
        component: KidsDashboard,
        title: 'Kids Zone | Admin',
      },

      {
        path: 'kids/bhajans',
        component: BhajanList,
        title: 'Bhajans | Admin',
      },
      {
        path: 'kids/bhajans/add',
        component: BhajanForm,
        title: 'Add Bhajan | Admin',
      },
      {
        path: 'kids/bhajans/edit/:id',
        component: BhajanForm,
        title: 'Edit Bhajan | Admin',
      },
      {
        path: 'kids/drawing',
        component: DrawingList,
        title: 'Drawing | Akhuratha Admin',
      },
      {
        path: 'kids/drawing/add',
        component: DrawingForm,
        title: 'Add Drawing | Akhuratha Admin',
      },
      {
        path: 'kids/drawing/edit/:id',
        component: DrawingForm,
        title: 'Edit Drawing | Akhuratha Admin',
      },
      // ============================================================
      // MANTRAS
      // ============================================================

      {
        path: 'kids/mantras',
        component: MantraList,
        title: 'Mantras | Admin',
      },
      {
        path: 'kids/mantras/add',
        component: MantraForm,
        title: 'Add Mantra | Admin',
      },
      {
        path: 'kids/mantras/edit/:id',
        component: MantraForm,
        title: 'Edit Mantra | Admin',
      },

      // ============================================================
      // MORNING PRAYERS
      // ============================================================

      {
        path: 'kids/morning-prayers',
        component: MorningPrayerList,
        title: 'Morning Prayers | Admin',
      },
      {
        path: 'kids/morning-prayers/add',
        component: MorningPrayerForm,
        title: 'Add Morning Prayer | Admin',
      },
      {
        path: 'kids/morning-prayers/edit/:id',
        component: MorningPrayerForm,
        title: 'Edit Morning Prayer | Admin',
      },

      // ============================================================
      // RHYMES
      // ============================================================

      {
        path: 'kids/rhymes',
        component: RhymeList,
        title: 'Kids Rhymes | Admin',
      },
      {
        path: 'kids/rhymes/add',
        component: RhymeForm,
        title: 'Add Rhyme | Admin',
      },
      {
        path: 'kids/rhymes/edit/:id',
        component: RhymeForm,
        title: 'Edit Rhyme | Admin',
      },

      // ============================================================
      // STORIES
      // ============================================================

      {
        path: 'kids/stories',
        component: StoryList,
        title: 'Stories | Admin',
      },
      {
        path: 'kids/stories/add',
        component: StoryForm,
        title: 'Add Story | Admin',
      },
      {
        path: 'kids/stories/edit/:id',
        component: StoryForm,
        title: 'Edit Story | Admin',
      },
      {
        path: 'kids/stories/:id/pages',
        component: StoryPages,
        title: 'Story Pages | Admin',
      },

      // ============================================================
      // GAMES
      // ============================================================

      {
        path: 'kids/games',
        component: GameList,
        title: 'Kids Games | Admin',
      },
      {
        path: 'kids/games/add',
        component: GameForm,
        title: 'Add Game | Admin',
      },
      {
        path: 'kids/games/edit/:id',
        component: GameForm,
        title: 'Edit Game | Admin',
      },
      {
        path: 'kids/games/:id/items',
        component: GameItems,
        title: 'Game Items | Admin',
      },

      // ============================================================
      // QUIZ
      // ============================================================

      {
        path: 'kids/quiz',
        component: QuizList,
        title: 'Kids Quiz | Admin',
      },
      {
        path: 'kids/quiz/add',
        component: QuizForm,
        title: 'Add Quiz | Admin',
      },
      {
        path: 'kids/quiz/edit/:id',
        component: QuizForm,
        title: 'Edit Quiz | Admin',
      },
      {
        path: 'kids/quiz/:id/questions',
        component: QuizQuestions,
        title: 'Quiz Questions | Admin',
      },

      // ============================================================
      // CERTIFICATES
      // ============================================================

      {
        path: 'kids/certificates',
        component: CertificateList,
        title: 'Kids Certificates | Admin',
      },

      // ============================================================
      // KIDS COMPETITIONS
      // ============================================================

      {
        path: 'kids/competitions',
        component: CompetitionList,
        title: 'Kids Competitions | Admin',
      },
      {
        path: 'kids/competitions/add',
        component: CompetitionForm,
        title: 'Add Kids Competition | Admin',
      },
      {
        path: 'kids/competitions/edit/:id',
        component: CompetitionForm,
        title: 'Edit Kids Competition | Admin',
      },
      {
        path: 'kids/competitions/:id/categories',
        component: CompetitionCategories,
        title: 'Competition Categories | Admin',
      },
      {
        path: 'kids/competitions/:id/registrations',
        component: CompetitionRegistrations,
        title: 'Competition Registrations | Admin',
      },
      {
        path: 'kids/competitions/:id/results',
        component: CompetitionResults,
        title: 'Competition Results | Admin',
      },
    ],
  },
];
