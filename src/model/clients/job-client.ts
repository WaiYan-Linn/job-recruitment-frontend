import axios from "axios";
import { BASE_URL, client } from "../utils";
import { JobRequest } from "../domains/job.domain";

export async function createJob(form: JobRequest) {
  return (await client.post("/jobs/post/create", form)).data;
}

export async function fetchJobs(page: number = 0, size: number = 10) {
  return (await client.get("/jobs/all", { params: { page, size } })).data;
}

export async function fetchJobsByEmployer(page: number = 0, size: number = 10) {
  return (await client.get(`/jobs/company`, { params: { page, size } })).data;
}

export async function fetchJobsById(id: number) {
  return (await client.get(`/jobs/${id}`)).data;
}
