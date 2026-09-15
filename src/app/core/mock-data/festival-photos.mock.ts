/**
 * THIS YEAR'S PHOTOS — the Ganesh idol and the Ganga Harathi, 2026.
 *
 * Every file here is a real photograph in  src/assets/images/  (already
 * resized by  tools/optimize-images.ps1 ; the full-size originals are kept in
 *  originals/ ). Near-identical shots were left out so the grids don't repeat
 * themselves — add or reorder entries freely. The first entry of each list is
 * the featured (largest) photo.
 */
export interface FestivalPhoto {
  src: string;
  alt: string;
  /** Short label shown on the tile and in the full-screen preview. */
  caption: string;
  /** Pixel size of the file, so tiles reserve the right shape. */
  width: number;
  height: number;
}

export const GANESH_2026_PHOTOS: FestivalPhoto[] = [
  {
    src: 'assets/images/1000284378.jpg',
    alt: "This year's Ganesh idol at Akhuratha Mandap — the many-armed Lord seated on a tiger",
    caption: 'Darshan at the mandap',
    width: 1200,
    height: 1600,
  },
  {
    src: 'assets/images/1000284381.jpg',
    alt: "Close-up of this year's Ganesh idol, with a golden crown and flower garland",
    caption: 'Up close',
    width: 1200,
    height: 1600,
  },
  {
    src: 'assets/images/IMG_3438.JPG',
    alt: "This year's Ganesh idol on a tiger, photographed outdoors under the open sky",
    caption: 'Under the open sky',
    width: 1200,
    height: 1600,
  },
  {
    src: 'assets/images/IMG_3447.JPG',
    alt: "This year's Ganesh idol being lifted by crane, watched by devotees",
    caption: 'Lifted by crane',
    width: 1200,
    height: 1600,
  },
  {
    src: 'assets/images/IMG_3463.JPG',
    alt: "This year's Ganesh idol inside the workshop, secured with straps",
    caption: 'At the workshop',
    width: 1200,
    height: 1600,
  },
  {
    src: 'assets/images/IMG_3476.JPG',
    alt: "This year's Ganesh idol inside the workshop under the lights",
    caption: 'Inside the workshop',
    width: 1200,
    height: 1600,
  },
];

export const HARATHI_2026_PHOTOS: FestivalPhoto[] = [
  {
    src: 'assets/images/1000284304.jpg',
    alt: 'A devotee raises the flaming harathi before the Ganesh idol',
    caption: 'The harathi flame',
    width: 1200,
    height: 1600,
  },
  {
    src: 'assets/images/1000284313.jpg',
    alt: 'Devotees perform the Ganga Harathi with lamps before the lit mandap',
    caption: 'Lamps before Bappa',
    width: 1200,
    height: 1600,
  },
  {
    src: 'assets/images/1000284295.jpg',
    alt: 'The mandap glowing at night as devotees perform the Ganga Harathi',
    caption: 'An evening at the mandap',
    width: 1600,
    height: 900,
  },
];
