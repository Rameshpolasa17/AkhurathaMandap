export interface SaveEventRequest {
  eventId: number;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  userId: number;
}
