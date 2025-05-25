"use client";
import { JobDetails, JobDetailsByIdProps } from "@/model/domains/job.domain";
import { fetchJobsById } from "@/model/clients/job-client";
import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { use } from "react";
import { useProfileStore } from "@/model/stores/profile-picture";

export default function JobDetailsById({ params }: JobDetailsByIdProps) {
  const { jobId } = use(params); // unwraps the promise
  const id = parseInt(jobId);

  if (isNaN(id)) return notFound(); // handle invalid id
  const [job, setJob] = useState<JobDetails | null>(null);

  // Format salary range
  const formatSalary = (min: number, max: number) => {
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`;
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  function getDaysLeft(deadline: string | Date): number {
    const deadlineDate = new Date(deadline);
    const today = new Date();

    // Remove time for date-only comparison
    deadlineDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const timeDiff = deadlineDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  }

  const profilePicture = useProfileStore((state) => state.profilePicture);

  useEffect(() => {
    fetchJobsById(id).then((data) => {
      setJob(data);
    });
  }, [id]);

  return (
    <div className="mx-6 max-w-5xl mt-2 bg-white shadow-lg rounded-2xl border border-gray-200 p-8">
      {job && (
        <>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <img
                src={profilePicture ?? undefined}
                alt={job.employer.companyName}
                className="w-16 h-16 rounded-lg object-cover bg-gray-100"
              />
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {job.title}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  {job.employer.companyName} · {job.location}
                </p>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <span
                className={`px-4 py-2 text-sm font-semibold rounded-full ${
                  getDaysLeft(job.deadline) > 0
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {getDaysLeft(job.deadline) > 0
                  ? `${getDaysLeft(job.deadline)} days left`
                  : "Expired"}
              </span>
            </div>
          </div>

          {/* Posted Info */}
          <div className="mb-6 text-sm text-gray-500">
            Posted on {formatDate(job.postedAt)}
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-xl shadow-sm">
              <p className="text-xs text-blue-800 mb-1">Salary Range</p>
              <p className="text-lg font-semibold text-blue-900">
                {formatSalary(job.salaryMin, job.salaryMax)}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl shadow-sm">
              <p className="text-xs text-purple-800 mb-1">Job Type</p>
              <p className="text-lg font-semibold text-purple-900">
                {job.jobType} · {job.workMode}
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-xl shadow-sm">
              <p className="text-xs text-yellow-800 mb-1">Experience</p>
              <p className="text-lg font-semibold text-yellow-900">
                {job.experience}
              </p>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            <Section title="Description" content={job.description} />
            <Section title="Requirements" content={job.requirements} />
            <Section title="Benefits" content={job.benefits} />
          </div>

          {/* Application Section */}
          <div className="pt-8 mt-8 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Application Deadline</p>
              <p className="font-semibold">{formatDate(job.deadline)}</p>
            </div>
            <a
              href={`mailto:${job.applicationEmail}`}
              className="mt-4 sm:mt-0 inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-3 px-6 rounded-lg transition-all shadow"
            >
              Apply Now
            </a>
          </div>
        </>
      )}
    </div>
  );

  // Reusable section
  function Section({ title, content }: { title: string; content: string }) {
    return (
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {content}
        </p>
      </section>
    );
  }
}
