export interface SaveSponsorRequest {
  sponsorId: number;
  sponsorTypeId: number;
  sponsorName: string;
  companyName: string;
  description: string;
  logoUrl: string;
  bannerUrl: string;
  website: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  email: string;
  phone: string;
  address: string;
  festivalYear: number;
  displayOrder: number;
  isFeatured: boolean;
  isActive: boolean;
  userId: number;
}
