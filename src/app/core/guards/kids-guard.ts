import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { KIDS_ENABLED } from '@core/config/app.config';

/**
 * Blocks direct navigation to the Kids Zone while `KIDS_ENABLED` is false.
 *
 * The Kids routes, components, services and assets all stay in place — only
 * the entry is closed. Flip `KIDS_ENABLED` to `true` in
 * `core/config/app.config.ts` to reopen them.
 */
export const kidsGuard: CanActivateFn = () => {
  if (KIDS_ENABLED) {
    return true;
  }
  return inject(Router).createUrlTree(['/']);
};
