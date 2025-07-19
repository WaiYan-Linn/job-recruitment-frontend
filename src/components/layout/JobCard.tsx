"use client";
import { JobDetailsWithStatus } from "@/model/domains/job.domain";
import { Clock, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

export default function JobCard({
  jobDetails,
  hasApplied,
  overDeadline,
}: JobDetailsWithStatus) {
  const {
    id,
    title,
    location,
    jobType,
    postedAt,
    requirements,
    salaryMin,
    salaryMax,
    employer,
  } = jobDetails;

  const trimmed = requirements.slice(0, 50);
  const parts = trimmed.includes(",")
    ? trimmed
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean)
    : [trimmed.trim()];

  const router = useRouter();

  const goToJob = () => router.push(`/public-employer/${employer.id}/${id}`);

  return (
    <div
      onClick={goToJob}
      className={`relative group cursor-pointer border rounded-3xl shadow-2xl p-6 transition-all duration-300 ${
        hasApplied
          ? "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 opacity-90 hover:opacity-100"
          : "bg-white dark:bg-gray-900 hover:shadow-3xl"
      }`}
    >
      {hasApplied && (
        <div className="absolute  -top-4 left-3  bg-gradient-to-r from-purple-200  to-cyan-400  text-gray-800 text-[10px] font-bold uppercase px-4 py-2 rounded-full shadow-md z-10">
          Applied
        </div>
      )}

      {overDeadline && (
        <div className="absolute -top-6 right-3 bg-gradient-to-r from-red-400 via-yellow-200 to-orange-400 text-white text-[10px] font-bold uppercase px-4 py-2 rounded-full shadow-lg border-2 border-red-500 animate-pulse z-10">
          <span className="inline-flex items-center gap-1">
            <svg
              className="w-3 h-3 text-white mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 5.636l-1.414 1.414A9 9 0 105.636 18.364l1.414-1.414A7 7 0 1118.364 5.636z"
              />
            </svg>
            Deadline Passed
          </span>
        </div>
      )}

      {typeof jobDetails.closed !== "undefined" && jobDetails.closed && (
        <div className="absolute top-28 -right-10 -translate-x-1/2 bg-gradient-to-r from-gray-500 to-gray-400 text-white text-xs font-bold uppercase px-4 py-1 rounded-full shadow-lg ">
          <span className="inline-flex items-center gap-1">
            <svg
              className="w-3 h-3 text-white mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Closed
          </span>
        </div>
      )}

      {/* Employer Info */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4 items-center">
          <img
            src={`http://localhost:8080${employer.profilePictureUrl}`}
            alt={employer.companyName}
            className="w-14 h-14 rounded-xl object-cover bg-white shadow"
          />
          <div>
            <p
              className="text-base font-bold text-gray-800 dark:text-white max-w-[180px] min-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap"
              title={employer.companyName}
            >
              {employer.companyName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {location}
            </p>
          </div>
        </div>
        <span className="absolute top-4 right-3 px-3 py-1 bg-indigo-100 dark:bg-indigo-700/20 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-semibold">
          {jobType}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition">
        {title}
      </h3>

      {/* Posted At */}
      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
        <Clock size={16} className="mr-2" />
        Posted: {new Date(postedAt).toLocaleDateString()}
      </div>

      {/* Tags */}
      <div className="mb-5 overflow-x-hidden whitespace-nowrap no-scrollbar">
        {parts.map((part, index) => {
          const isLast = index === parts.length - 1;
          const showEllipsis = requirements.length > 50 && isLast;
          return (
            <span
              key={index}
              className="inline-block bg-indigo-50 dark:bg-indigo-700/20 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-xs font-medium mr-2"
            >
              {part + (showEllipsis ? "..." : "")}
            </span>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-sm pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <MapPin size={16} className="mr-2" />
          {location}
        </div>
        <span className="font-bold text-indigo-700 dark:text-indigo-400">
          MMK {salaryMin} - {salaryMax}
        </span>
      </div>

      {/* Button */}
      <div className="mt-6">
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToJob();
          }}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold shadow-md transform transition-all duration-300
            ${
              overDeadline || jobDetails.closed
                ? "bg-gray-500 text-white border border-gray-400 hover:bg-gray-600"
                : hasApplied
                ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                : "bg-gradient-to-r from-indigo-500 via-purple-600 to-blue-500 text-white hover:shadow-xl hover:-translate-y-1"
            }`}
        >
          <span>
            {overDeadline || jobDetails.closed
              ? "View Job"
              : hasApplied
              ? "View Job (Applied)"
              : "Apply Now"}
          </span>
          {!hasApplied && !overDeadline && !jobDetails.closed && (
            <svg
              className="w-4 h-4 animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
