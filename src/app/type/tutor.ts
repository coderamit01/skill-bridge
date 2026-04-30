export interface TutorProfile {
  userId: string;
  bio?: string | undefined;
  hourlyRate?: number | undefined;
  yearsExperience?: number | undefined;
  education?: string | undefined;
  categoryId?: string | undefined;
  avg_rating?: number | undefined;
  avilable_start_time: string;
  avilable_end_time: string;
}
export interface TutorUpdateProfile {
  userId: string;
  bio?: string | null;
  hourlyRate?: number | null;
  yearsExperience?: number | null;
  education?: string | null;
  categoryId?: string | null;
  avg_rating?: number | null;
  avilable_start_time: string;
  avilable_end_time: string;
}
