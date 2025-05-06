import axios from "axios";
import { BASE_URL, client } from "../utils";
import { JobRequest } from "../domains/job.domain";

export async function createJob(form: JobRequest) {
  return (await client.post("/jobs", form)).data;
}
