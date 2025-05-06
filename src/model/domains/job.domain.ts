export type JobType = "FULL_TIME" | "PART_TIME" | "INTERNSHIP";
export type WorkMode = "ON_SITE" | "HYBRID" | "REMOTE";
export type Category =
  | "IT"
  | "Engineering"
  | "Banking"
  | "Sales"
  | "Marketing"
  | "Design"
  | "Others";
export type Experience = "Entry" | "Mid" | "Senior";

export interface JobRequest {
  title: string;
  category: Category;
  location: string;
  jobType: JobType;
  workMode: WorkMode;
  experience: Experience;
  salaryMin: number;
  salaryMax: number;
  description: string;
  requirements: string;
  benefits: string;
  deadline: string; // format: YYYY-MM-DD
  applicationEmail: string;
}
