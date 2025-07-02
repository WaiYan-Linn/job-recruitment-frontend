import axios from "axios";
import { BASE_URL, client } from "../utils";

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
