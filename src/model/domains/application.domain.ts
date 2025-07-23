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
