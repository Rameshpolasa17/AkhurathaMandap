export interface SaveVideoRequest {
  videoId: number;
  title: string;
  description: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  displayOrder: number;
  isActive: boolean;
  userId: number;
}
