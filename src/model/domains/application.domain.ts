export type Status = "NEW" | "INTERVIEW" | "HIRED" | "REJECTED"; // Add other possible values

export interface ApplicationResponseDto {
  id: number;
  jobId: number;
  jobSeekerId: number;
  jobSeekerName: string;
  appliedAt: string;
  profilePictureUrl: string;
  resumeUrl: string;
  status: string;
  // plus whatever else you need (applicant name, email), or fetch from another endpoint
}

export type InterviewDetails = {
  dateTime: string;
  location: string;
  notes: string;
};

export type ApplicationInfo = {
  applicationId: number;
  JobTitle: string;
  jobDescription: string;
  appliedAt: string; // ISO 8601 string from LocalDateTime
  companyName: string;
  profilePictureUrl: string;
  email: string;
  dateTime: string; // ISO 8601 string from LocalDateTime (interview date/time)
  location: string;
  notes: string;
  status: Status;
};
