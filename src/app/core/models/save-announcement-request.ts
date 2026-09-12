export interface SaveAnnouncementRequest {
  announcementId: number;
  title: string;
  description: string;
  imageUrl: string;
  publishDate: string;
  expiryDate: string;
  isActive: boolean;
  userId: number;
}
