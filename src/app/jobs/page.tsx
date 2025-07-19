"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { JobDetailsWithStatus } from "@/model/domains/job.domain";
import SearchJobsForm from "@/components/forms/SearchJobsForm";
import JobCard from "@/components/layout/JobCard";
import { useAccessToken } from "@/model/stores/use-accessToken";
import { fetchJobs, fetchJobWithParams } from "@/model/clients/job-client";

export default function JobsPage() {
  const searchParams = useSearchParams();

  const [jobs, setJobs] = useState<JobDetailsWithStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = useAccessToken((s) => s.accessToken);

  useEffect(() => {
    const keyword = searchParams.get("keyword") || undefined;
    const location = searchParams.get("location") || undefined;
    const specialization = searchParams.get("specialization") || undefined;

    const loadJobs = async () => {
      try {
        const data = await fetchJobWithParams({
          keyword,
          location,
          specialization,
        });
        setJobs(data.contents || []);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [searchParams]);

  useEffect(() => {
    const fetchAndSetJobs = async () => {
      if (token) {
        try {
          const res = await fetchJobs();
          setJobs(res.contents || []);
        } catch (err: any) {
          setError(err.message || "Unknown error occurred");
        }
      }
    };
    fetchAndSetJobs();
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto pt-24 px-6 py-14">
      <SearchJobsForm />

      {loading && <p>Loading jobs...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
          {jobs.map(({ jobDetails, hasApplied, overDeadline }) => (
            <JobCard
              key={jobDetails.id}
              jobDetails={jobDetails}
              hasApplied={hasApplied}
              overDeadline={overDeadline}
            />
          ))}
        </div>
      )}
    </div>
  );
}
