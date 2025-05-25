import axios from "axios";
import { BASE_URL, client } from "../utils";
import { JobDetails, JobListing } from "../domains/job.domain";
import { EmployerProfile } from "../domains/employer.domain";

export async function fetchJobsByCompany(
  id: string,
  page: number = 0,
  size: number = 10
) {
  return (await client.get(`/jobs/company/${id}/posted`)).data;
}

export async function fetchCompany(id: string) {
  return (await client.get(`/employer/${id}`)).data;
}
