// app/public-employer/[id]/[jobId]/page.tsx
import JobDetailsClient from "@/app/public-employer/[id]/[jobId]/JobDetailsClient";
import { notFound } from "next/navigation";
import { fetchJobsById } from "@/model/clients/job-client";

interface Props {
  params: { id: string; jobId: string }; // this is already awaited by Next
}

export default async function JobPage({ params }: Props) {
  const job = await fetchJobsById(Number(params.jobId));
  if (!job) return notFound();

  return <JobDetailsClient job={job} />;
}
