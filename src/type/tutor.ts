export interface TutorProfile {
  user_id: string;
  bio?: string | undefined;
  hourly_rate?: number | undefined;
  experience_years?: number | undefined;
  education?: string | undefined;
  category_id?: string | undefined;
  avg_rating?: number | undefined;
  avilable_start_time: string;
  avilable_end_time: string;
}
