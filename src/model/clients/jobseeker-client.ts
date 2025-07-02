import axois from "axios";
import { BASE_URL, client } from "../utils";
import {
  JobSeekerDetails,
  JobSeekerUpdateForm,
} from "../domains/jobseeker.domain";

export async function fetchJobSeekerProfile() {
  return (await client.get("/jobseeker")).data;
}
export async function updateJobSeekerProfile(form: JobSeekerUpdateForm) {
  return (await client.put("/jobseeker/profile/update", form)).data;
}

export async function uploadJobSeekerProfilePicture(
  file: File
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await client.post("/jobseeker/profile/picture", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data; // this is the image URL returned by your backend
}
