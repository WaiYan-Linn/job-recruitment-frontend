import axios from "axios";
import { BASE_URL, client } from "../utils";
import { FetchJobParams, JobRequest } from "../domains/job.domain";

export async function createJob(form: JobRequest) {
  return (await client.post("/jobs/post/create", form)).data;
}

export async function fetchJobs(page: number = 0, size: number = 10) {
  return (await client.get("/jobs/all", { params: { page, size } })).data;
}

export async function fetchJobsByMaxSalaires(
  page: number = 0,
  size: number = 10
) {
  return (await client.get("/jobs/salaries", { params: { page, size } })).data;
}

export async function fetchJobsByEmployer(page: number = 0, size: number = 10) {
  return (await client.get(`/jobs/company`, { params: { page, size } })).data;
}

export async function fetchJobsById(id: number) {
  return (await client.get(`/jobs/${id}`)).data;
}

export async function fetchJobWithParams({
  page = 0,
  size = 10,
  keyword,
  location,
  specialization,
}: FetchJobParams) {
  const res = await client.get("/jobs/all", {
    params: { page, size, keyword, location, specialization },
  });
  return res.data;
}
