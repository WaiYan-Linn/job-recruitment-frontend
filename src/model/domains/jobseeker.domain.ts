export interface JobSeekerUpdateForm {
  personalName: string;
  profileSummary: string;
  profilePictureUrl: string | null; // URL as string, nullable
  dateOfBirth: string | null; // ISO string, nullable
  skills: string[];
  phoneNumber: string;
  address: string;
}

export interface JobSeekerDetails {
  id: string; // UUID as string
  personalName: string;
  profileSummary: string;
  profilePictureUrl: string | null; // URL as string, nullable
  email: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string | null; // ISO string, nullable
  skills: string[];
  applications: ApplicationSummary[];
}

export interface ApplicationSummary {
  id: number;
  jobTitle: string;
  companyName: string;
  status: string;
  appliedDate: string; // ISO string
}
