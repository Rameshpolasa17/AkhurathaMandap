export interface SaveGalleryRequest {
  galleryId: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  displayOrder: number;
  isActive: boolean;
}
