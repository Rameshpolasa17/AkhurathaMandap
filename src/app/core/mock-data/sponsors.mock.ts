import { Sponsor } from '../models/sponsors';

/**
 * Festival sponsors.
 *
 * Intentionally empty — no sponsors have been announced yet, and none are
 * invented here. The Sponsors page and the home-page strip both render a
 * "Official sponsors will be announced soon." state while this array is empty.
 *
 * To publish sponsors, add entries below:
 *   sponsorTypeId map: 1 Title, 2 Platinum, 3 Gold, 4 Silver, 5 Bronze, 6 Supporter.
 *   Logos go in `src/assets/images/sponsors/`; a missing file falls back to a
 *   monogram tile. Leave `website` empty to hide the visit-site action.
 */
export const MOCK_SPONSORS: Sponsor[] = [];
