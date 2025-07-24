import axios from "axios";
import { BASE_URL, client } from "../utils";
import {
  EmployerProfile,
  UpdateEmployerRequest,
} from "../domains/employer.domain";
import { PageResult } from "../domains/job.domain";

export async function fetchEmployerProfile(): Promise<EmployerProfile> {
  return (await client.get("/employer/profile/about")).data;
}

export async function fetchAllCompanies(
  name?: string,
  page: number = 0,
  size: number = 10
) {
  return (await client.get("/employer/all", { params: { name, page, size } }))
    .data;
}

export async function updateEmployerProfile(form: UpdateEmployerRequest) {
  return (await client.put("/employer/profile/update", form)).data;
}

export async function uploadEmployerProfilePicture(
  file: File
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await client.post("/employer/profile/picture", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data; // this is the image URL returned by your backend
}
