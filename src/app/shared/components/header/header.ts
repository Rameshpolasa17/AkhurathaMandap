import { Component, HostListener, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';

import { APP_CONFIG } from '@core/config/app.config';
import { MAIN_NAV, NavLink, visibleLinks } from '@core/config/navigation';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private router = inject(Router);

  readonly mandapName = APP_CONFIG.mandapName;
  readonly festivalName = APP_CONFIG.festivalName;

  /** Kids Zone is filtered out here while KIDS_ENABLED is false. */
  readonly menus: NavLink[] = visibleLinks(MAIN_NAV);
  /** The desktop bar leaves out links marked mobile-only. */
  readonly desktopMenus: NavLink[] = this.menus.filter((link) => !link.mobileOnly);

  readonly isScrolled = signal(false);
  readonly isMenuOpen = signal(false);

  constructor() {
    // Any navigation closes the mobile drawer, including browser back/forward.
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this.closeMenu());
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 24);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isMenuOpen()) {
      this.closeMenu();
    }
  }

  toggleMenu(): void {
    this.isMenuOpen() ? this.closeMenu() : this.openMenu();
  }

  openMenu(): void {
    this.isMenuOpen.set(true);
    // Stop the page behind the drawer from scrolling.
    document.body.style.overflow = 'hidden';
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
    document.body.style.overflow = '';
  }
}
