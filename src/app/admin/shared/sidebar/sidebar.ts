import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,

  imports: [CommonModule, RouterLink, RouterLinkActive],

  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  openedMenu: string | null = null;

  constructor(private router: Router) {
    if (this.router.url.startsWith('/admin/kids')) {
      this.openedMenu = 'Kids Zone';
    }
  }

  menus = [
    {
      title: 'Dashboard',
      icon: 'fa-solid fa-gauge-high',
      route: '/admin/dashboard',
    },

    {
      title: 'Announcements',
      icon: 'fa-solid fa-bullhorn',
      route: '/admin/announcements',
    },

    {
      title: 'Events',
      icon: 'fa-solid fa-calendar-days',
      route: '/admin/events',
    },

    {
      title: 'Gallery',
      icon: 'fa-solid fa-images',
      route: '/admin/gallery',
    },

    {
      title: 'Videos',
      icon: 'fa-solid fa-video',
      route: '/admin/videos',
    },

    {
      title: 'Sponsors',
      icon: 'fa-solid fa-handshake',
      route: '/admin/sponsors',
    },

    // =====================================================
    // KIDS ZONE
    // =====================================================

    {
      title: 'Kids Zone',

      icon: 'fa-solid fa-child-reaching',

      children: [
        {
          title: 'Dashboard',
          icon: 'fa-solid fa-house',
          route: '/admin/kids',
        },

        {
          title: 'Bhajans',
          icon: 'fa-solid fa-music',
          route: '/admin/kids/bhajans',
        },
        {
          title: 'Drawing',
          icon: 'fa-solid fa-palette',
          route: '/admin/kids/drawing',
        },
        {
          title: 'Mantras',
          icon: 'fa-solid fa-om',
          route: '/admin/kids/mantras',
        },

        {
          title: 'Morning Prayers',
          icon: 'fa-solid fa-sun',
          route: '/admin/kids/morning-prayers',
        },

        {
          title: 'Kids Rhymes',
          icon: 'fa-solid fa-microphone-lines',
          route: '/admin/kids/rhymes',
        },

        {
          title: 'Stories',
          icon: 'fa-solid fa-book-open',
          route: '/admin/kids/stories',
        },

        {
          title: 'Games',
          icon: 'fa-solid fa-gamepad',
          route: '/admin/kids/games',
        },

        {
          title: 'Quiz',
          icon: 'fa-solid fa-circle-question',
          route: '/admin/kids/quiz',
        },

        {
          title: 'Certificates',
          icon: 'fa-solid fa-certificate',
          route: '/admin/kids/certificates',
        },

        {
          title: 'Competitions',
          icon: 'fa-solid fa-medal',
          route: '/admin/kids/competitions',
        },
      ],
    },

    // =====================================================
    // OTHER ADMIN MENUS
    // =====================================================

    {
      title: 'Competitions',
      icon: 'fa-solid fa-trophy',
      route: '/admin/competitions',
    },

    {
      title: 'Contacts',
      icon: 'fa-solid fa-address-book',
      route: '/admin/contacts',
    },

    {
      title: 'Settings',
      icon: 'fa-solid fa-gear',
      route: '/admin/settings',
    },

    {
      title: 'Users',
      icon: 'fa-solid fa-users',
      route: '/admin/users',
    },
  ];

  // =====================================================
  // TOGGLE MENU
  // =====================================================

  toggleMenu(title: string): void {
    this.openedMenu = this.openedMenu === title ? null : title;
  }

  // =====================================================
  // CHECK MENU OPEN
  // =====================================================

  isMenuOpen(title: string): boolean {
    return this.openedMenu === title;
  }
}
