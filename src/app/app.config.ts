import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { jwtInterceptor } from '@core/interceptors/jwt-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideRouter(
      routes,
      // Every navigation starts at the top; back/forward restores the position.
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      withRouterConfig({ onSameUrlNavigation: 'reload' }),
    ),

    // No HTTP calls are made today — the site runs entirely on the mock data in
    // core/mock-data. This stays wired so the core services can be switched
    // back to real API calls without touching bootstrap.
    provideHttpClient(withInterceptors([jwtInterceptor])),
  ],
};
