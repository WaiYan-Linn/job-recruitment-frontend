"use client";
import { useState, useEffect } from "react";
import { JobListing, PageResult } from "@/model/domains/job.domain";
import { fetchJobsByEmployer } from "@/model/clients/job-client";
import { useRouter } from "next/navigation";
import { useAccessToken } from "@/model/stores/use-accessToken";
import { fetchEmployerProfile } from "@/model/clients/employer-client";
import { useProfileStore } from "@/model/stores/profile-picture";

export default function JobListingPage() {
  const [jobsPage, setJobsPage] = useState<PageResult<JobListing> | null>(null);

  const setProfilePicture = useProfileStore((state) => state.setProfilePicture);
  const profilePicture = useProfileStore((state) => state.profilePicture);

  const router = useRouter();

  const handleJobClick = (jobId: number, jobData: JobListing) => {
    router.push(`/employer/job-listing/${jobId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const token = useAccessToken((s) => s.accessToken);
  useEffect(() => {
    if (!token) return;

    // IIFE so we can use async/await in a useEffect
    (async () => {
      try {
        const data = await fetchEmployerProfile();

        const rawUrl = data.profilePictureUrl?.trim();
        if (!rawUrl || rawUrl === "null" || rawUrl.includes("null")) {
          setProfilePicture(null);
        } else {
          setProfilePicture(`http://localhost:8080${rawUrl}`);
        }

        // 2) fetch jobs
        const page = await fetchJobsByEmployer(0, 10);
        setJobsPage(page);
      } catch (err) {
        console.error("Error loading employer data:", err);
      }
    })();
  }, [token]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-6 lg:px-20">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
          Job Listings
        </h1>

        <div className="w-full space-y-4">
          {jobsPage ? (
            jobsPage.contents.map((job) => (
              <div
                key={job.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md hover:border-blue-500 hover:bg-blue-50`}
                onClick={() => handleJobClick(job.id, job)}
              >
                <div className="flex items-start">
                  {profilePicture ? (
                    <img
                      src={profilePicture}
                      alt={job.employer.name}
                      className="w-12 h-12 rounded object-cover mr-4"
                    />
                  ) : (
                    <div>No profile picture set</div>
                  )}

                  <div className="flex-1">
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-semibold text-lg text-gray-800">
                          {job.title}
                        </h3>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            job.closed
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {job.closed ? "Closed" : "Open"}
                        </span>
                      </div>

                      <p className="text-gray-600">{job.employer.name}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          {job.location}
                        </span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          {job.jobType}
                        </span>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                          {job.workMode}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between mt-3 text-sm">
                      <span className="text-gray-600">
                        MMK {job.salaryMin} - {job.salaryMax}
                      </span>
                      <span className="text-gray-500">
                        Posted {formatDate(job.postedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 bg-white border border-gray-200 rounded-lg text-center">
              <p className="text-gray-500">Loading jobs…</p>
            </div>
          )}
        </div>

        {/* Pagination controls */}
        {jobsPage && jobsPage.totalItems > jobsPage.size && (
          <div className="mt-6 flex gap-2">
            {Array.from(
              { length: Math.ceil(jobsPage.totalItems / jobsPage.size) },
              (_, i) => i
            ).map((pageIndex) => (
              <button
                key={pageIndex}
                className={`px-3 py-1 border rounded ${
                  jobsPage.currentPage === pageIndex
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700"
                }`}
                onClick={() => fetchJobsByEmployer(pageIndex, jobsPage.size)}
              >
                {pageIndex + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
