// app/public-employer/[id]/[jobId]/page.tsx
import JobDetailsClient from "@/app/public-employer/[id]/[jobId]/JobDetailsClient";
import { notFound } from "next/navigation";
import { fetchJobsById } from "@/model/clients/job-client";

interface Props {
  params: Promise<{ jobId: string }>;
}

export default async function JobPage({ params }: Props) {
  const { jobId } = await params; // <-- Await the params promise here

  const job = await fetchJobsById(Number(jobId));
  if (!job) return notFound();

  return <JobDetailsClient job={job} />;
}
