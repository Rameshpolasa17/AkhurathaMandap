/**
 * A single gallery photo.
 *
 * `imageUrl` points at `assets/images/gallery/…`. The file does not have to
 * exist yet — every gallery surface renders an elegant placeholder when an
 * image is missing, so real photos can be dropped in later without any code
 * change beyond updating `core/mock-data/gallery.mock.ts`.
 */
export interface Gallery {
  galleryId: number;
  title: string;
  description: string;
  imageUrl: string;
  /** One of `GALLERY_CATEGORIES`. */
  category: string;
  displayOrder: number;
  isActive: boolean;
  /** Featured photos lead the masonry grid and fill the home-page preview. */
  featured?: boolean;
  createdDate: string;
  updatedDate?: string;
}

/**
 * Categories currently represented in the mandap's photographs.
 * The filter bar is built from the data itself, so adding a new category
 * here and using it in `gallery.mock.ts` is all that is needed.
 */
export const GALLERY_CATEGORIES = [
  'Ganesh',
  'Puja',
  'Decorations',
  'Volunteers',
  'Procession',
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];
