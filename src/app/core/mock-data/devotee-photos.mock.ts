/**
 * DEVOTEE PHOTO WALL — selfies with Bappa sent in by devotees on WhatsApp.
 *
 * HOW TO POST A PHOTO
 *   1. Save the photo the devotee sent into  src/assets/images/devotees/
 *      (e.g.  devotees/ravi-kumar.jpg ) — and only post photos whose sender
 *      agreed in their message, as the WhatsApp template asks them to.
 *   2. Add an entry to the top of the list below (newest first).
 *   3. (Optional) run  tools/optimize-images.ps1 , then commit and push.
 *
 * Leave `name` empty to post a photo without a name.
 */
export interface DevoteePhoto {
  id: number;
  imageUrl: string;
  /** Shown under the photo, e.g. "Ravi Kumar". Optional. */
  name: string;
  /** Town or colony, e.g. "Siricilla". Optional. */
  place: string;
  /** `YYYY-MM-DD` — the day they visited. */
  date: string;
}

export const DEVOTEE_PHOTOS: DevoteePhoto[] = [
  // {
  //   id: 1,
  //   imageUrl: 'assets/images/devotees/ravi-kumar.jpg',
  //   name: 'Ravi Kumar',
  //   place: 'Siricilla',
  //   date: '2026-09-15',
  // },
];
