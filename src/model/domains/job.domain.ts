import { NumberDomain } from "recharts/types/util/types";

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

interface EmployerDTO {
  id: number;
  companyName: string;
  website: string;
  profilePictureUrl: string;
}

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

export interface JobListing {
  id: number;
  title: string;
  location: string;
  jobType: JobType;
  workMode: WorkMode;
  salaryMin: number;
  salaryMax: number;
  postedAt: string;
  employer: {
    id: number;
    name: string;
  };
  closed: boolean;
}

export interface JobDetails {
  id: number;
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
  deadline: string; // LocalDate -> ISO string like "2025-05-31"
  applicationEmail: string;
  postedAt: string; // LocalDate -> ISO string
  employer: EmployerDTO;
  closed: boolean;
}

export interface JobDetailsByIdProps {
  params: Promise<{ jobId: string }>;
}

export interface PageResult<T> {
  contents: T[];
  totalItems: number;
  size: number;
  currentPage: number;
}

export type JobDetailsWithStatus = {
  jobDetails: JobDetails;
  hasApplied: boolean;
  overDeadline: boolean;
};

export interface FetchJobParams {
  page?: number;
  size?: number;
  keyword?: string;
  location?: string;
  specialization?: string;
}
