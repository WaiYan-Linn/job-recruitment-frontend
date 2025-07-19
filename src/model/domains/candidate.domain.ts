// Define your allowed statuses (match your Java `Application.Status` enum names)
export type ApplicationStatus = "NEW" | "INTERVIEW" | "HIRED" | "REJECTED";

// DTO for listing candidates
export interface EmployerCandidateViewDto {
  jobId: number;
  jobTitle: string;

  jobSeekerId: string; // UUID as string
  jobSeekerName: string;
  profilePictureUrl: string | null;
  profileSummary: string;
  email: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string; // ISO date (e.g. "1990-05-21")

  skills: string[];

  applicationId: number;
  appliedAt: string; // ISO datetime (e.g. "2025-07-16T12:34:56")
  resumeUrl: string | null;
  status: ApplicationStatus;
}
