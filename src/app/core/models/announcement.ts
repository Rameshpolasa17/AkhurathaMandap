export interface Announcement {
  announcementId: number;
  title: string;
  description: string;
  imageUrl: string | null;
  /**
   * Topic shown on the card and used by the filter bar. Optional: when it is
   * not set the Announcements page derives one from the wording, so notices
   * added from the admin screen still group sensibly.
   */
  category?: string;
  publishDate: string;
  expiryDate: string | null;
  isActive: boolean;
  createdBy: number | null;
  createdOn: string;
  updatedBy: number | null;
  updatedOn: string | null;
}
