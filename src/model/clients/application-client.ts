import axios from "axios";
import { BASE_URL, client } from "../utils";
import {
  ApplicationInfo,
  ApplicationResponseDto,
  InterviewDetails,
} from "../domains/application.domain";
import {
  ApplicationStatus,
  EmployerCandidateViewDto,
} from "../domains/candidate.domain";

export async function checkApplication(id: number) {
  return (await client.get(`/app/${id}/has-applied`)).data;
}

export async function applyToJob(jobId: number, file: File): Promise<string> {
  const formData = new FormData();
  formData.append("resumeFile", file);

  const response = await client.post(`/app/apply/${jobId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data; // e.g., "Application submitted successfully"
}

export async function fetchApplicationsForJob(
  jobId: number
): Promise<ApplicationResponseDto[]> {
  return (await client.get(`/applications/${jobId}`)).data;
}

export async function fetchAllApplication(): Promise<
  EmployerCandidateViewDto[]
> {
  return (await client.get(`/applications`)).data;
}
export async function fetchApplicationDetails(
  id: number
): Promise<EmployerCandidateViewDto> {
  return (await client.get(`/applications/details/${id}`)).data;
}
export async function previewResume(applicationId: number): Promise<void> {
  try {
    const response = await client.get(`/applications/resume/${applicationId}`, {
      responseType: "blob",
    });

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    // Open in a new tab for preview
    window.open(url, "_blank");
  } catch (error) {
    console.error("Failed to load resume:", error);
    alert("Unable to preview resume. Please try again later.");
  }
}

export async function updateApplicationStatus(
  applicationId: number,
  status: ApplicationStatus
): Promise<void> {
  await client.patch(`/applications/${applicationId}/status`, null, {
    params: { status },
  });
}

export async function scheduleInterview(
  applicationId: number,
  data: {
    dateTime: string; // ISO string: e.g., "2025-07-21T14:30"
    location: string;
    notes?: string;
  }
): Promise<void> {
  await client.post(`/applications/${applicationId}/interview`, data);
}

export async function hire(applicationId: number): Promise<void> {
  await client.post(`/applications/${applicationId}/hired`);
}

export async function reject(applicationId: number): Promise<void> {
  await client.post(`/applications/${applicationId}/rejected`);
}

export async function getApplicationsByJob(
  jobId: number
): Promise<EmployerCandidateViewDto> {
  return (
    await client.get(`/applications/job`, {
      params: {
        jobId: jobId,
      },
    })
  ).data;
}

export async function getApplicationsByStatus(
  status: String
): Promise<EmployerCandidateViewDto> {
  return (
    await client.get(`/applications/status`, {
      params: { status: status },
    })
  ).data;
}

export async function getInterviewInfo(
  applicationId: number
): Promise<InterviewDetails> {
  return (await client.get(`/applications/${applicationId}/interview`)).data;
}
