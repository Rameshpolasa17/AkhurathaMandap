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

/**
 * The single feature photograph on the home page — change this one line to
 * put a different photo in the spotlight.
 */
export const RAJA_FEATURE_PHOTO: FestivalPhoto = {
  src: 'assets/images/1000285405.jpg',
  alt: 'Siricilla Ka Raja 2026 — the many-armed Ganesh idol seated on a tiger, holding an axe',
  caption: 'Siricilla Ka Raja',
  width: 960,
  height: 1023,
};

export const GANESH_2026_PHOTOS: FestivalPhoto[] = [
  {
    src: 'assets/images/1000284382.jpg',
    alt: "This year's Ganesh idol at Akhuratha Mandap, garlanded and seated on a tiger",
    caption: 'Darshan at the mandap',
    width: 1200,
    height: 1600,
  },
  {
    src: 'assets/images/1000285411.jpg',
    alt: 'The Ganesh idol lit by sparks during the evening celebration',
    caption: 'Lit by sparks',
    width: 768,
    height: 1318,
  },
  {
    src: 'assets/images/1000289745.png',
    alt: "A close look at the tiger's head beneath the Ganesh idol",
    caption: 'The tiger',
    width: 1086,
    height: 1448,
  },
  {
    src: 'assets/images/1000286314.jpg',
    alt: 'The decorated Akhuratha Mandap entrance with the idol inside',
    caption: 'The mandap',
    width: 1200,
    height: 1600,
  },
  {
    src: 'assets/images/1000289716.png',
    alt: 'Close-up of the idol’s hand holding a golden axe',
    caption: 'The axe',
    width: 1086,
    height: 1448,
  },
  {
    src: 'assets/images/1000289722.png',
    alt: 'Close-up of the idol’s hand holding a string of prayer beads',
    caption: 'The beads',
    width: 1086,
    height: 1448,
  },
  {
    src: 'assets/images/1000288562.jpg',
    alt: 'The crowned face of this year’s Ganesh idol, close up',
    caption: 'Up close',
    width: 1200,
    height: 1600,
  },
  {
    src: 'assets/images/1000291315.jpg',
    alt: 'The idol on its decorated float, lit up for the procession',
    caption: 'The procession',
    width: 1200,
    height: 1600,
  },
  {
    src: 'assets/images/1000288618.jpg',
    alt: 'The letters AKM laid out in pink flower petals',
    caption: 'AKM in petals',
    width: 1600,
    height: 1200,
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
