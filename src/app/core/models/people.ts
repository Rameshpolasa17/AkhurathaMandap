export interface Volunteer {
  volunteerId: number;
  name: string;
  role: string;
  imageUrl: string;
  description: string;
  displayOrder: number;
}

export interface CommitteeMember {
  memberId: number;
  name: string;
  designation: string;
  imageUrl: string;
  description: string;
  displayOrder: number;
}
