/**
 * Frontend-only build.
 *
 * The site currently runs entirely on local mock data exposed through the
 * services in `src/app/core/services`. There is no backend running.
 *
 * When the real APIs are ready:
 *   1. Set `useMockData` to `false`.
 *   2. Point `apiUrl` / `fileUrl` at the real server.
 *   3. Each core service already has the matching HttpClient call ready to
 *      swap back in (see the `// API-READY:` comments inside them).
 */
export const environment = {
  production: false,

  /** Toggle between local mock data and real HTTP APIs. */
  useMockData: true,

  /** Base URL for the future REST API (unused while `useMockData` is true). */
  apiUrl: '',

  /** Base URL for future server-hosted files/images (empty => use local assets). */
  fileUrl: '',
};
