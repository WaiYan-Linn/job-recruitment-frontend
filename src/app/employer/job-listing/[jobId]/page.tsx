"use client";
import { JobDetails, JobDetailsByIdProps } from "@/model/domains/job.domain";
import { fetchJobsById } from "@/model/clients/job-client";
import { closeJobs } from "@/model/clients/job-client";
import { useState, useEffect } from "react";
import { notFound, useRouter } from "next/navigation";
import { use } from "react";
import { useProfileStore } from "@/model/stores/profile-picture";
import { ApplicationResponseDto } from "@/model/domains/application.domain";
import {
  previewResume,
  fetchApplicationsForJob,
} from "@/model/clients/application-client";
import { useAccessToken } from "@/model/stores/use-accessToken";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function JobDetailsById({ params }: JobDetailsByIdProps) {
  const { jobId } = use(params);
  const id = parseInt(jobId, 10);
  if (isNaN(id)) return notFound();

  const [job, setJob] = useState<JobDetails | null>(null);
  const [applications, setApplications] = useState<ApplicationResponseDto[]>(
    []
  );
  const [appsLoading, setAppsLoading] = useState(true);

  const profilePicture = useProfileStore((s) => s.profilePicture);
  const token = useAccessToken((s) => s.accessToken);
  const router = useRouter();

  useEffect(() => {
    if (!token || isNaN(id)) return;
    (async () => {
      try {
        const jobData = await fetchJobsById(id);
        setJob(jobData);
        const apps = await fetchApplicationsForJob(id);
        setApplications(apps);
      } catch (err) {
        console.error(err);
      } finally {
        setAppsLoading(false);
      }
    })();
  }, [token, id]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const filterByStatus = (status: string) =>
    status === "ALL"
      ? applications
      : applications.filter((app) => app.status === status);

  return (
    <div className="mx-6 max-w-5xl mt-4 bg-white shadow-lg rounded-2xl border border-gray-200 p-8">
      {job && (
        <Tabs defaultValue="DETAILS" className="space-y-6">
          <TabsList className="grid grid-cols-2 space-x-2  p-2 bg-transparent">
            <TabsTrigger value="DETAILS" className=" px-4 py-3 bg-gray-100 ">
              Job Details
            </TabsTrigger>
            <TabsTrigger value="APPLICANTS" className=" px-4 py-3  bg-gray-100">
              Applicants ({applications.length})
            </TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="DETAILS" className="pt-4 space-y-6">
            <div className="mb-6 flex items-center gap-4"></div>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              {/* LEFT SIDE - Company Info */}
              <div className="flex items-center gap-4">
                <img
                  src={
                    profilePicture ??
                    `http://localhost:8080${job.employer.profilePictureUrl}`
                  }
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

              {/* RIGHT SIDE - Job Status Badge */}
              <div className="mt-4 md:mt-0">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    job.closed
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {job.closed ? "Closed" : "Open"}
                </span>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              Posted on {formatDate(job.postedAt)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-xl shadow-sm">
                <p className="text-xs text-blue-800 mb-1">Salary Range</p>
                <p className="text-lg font-semibold text-blue-900">
                  MMK {job.salaryMin} - {job.salaryMax}
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

            <Section title="Description" content={job.description} />
            <Section title="Requirements" content={job.requirements} />
            <Section title="Benefits" content={job.benefits} />

            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="pt-4 border-t border-gray-200">
                <p className="text-gray-500 text-sm mb-1">
                  Application Deadline
                </p>
                <p className="font-semibold">{formatDate(job.deadline)}</p>
              </div>
              <button
                disabled={job.closed === true}
                className="ml-4 mt-8 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-400 text-white font-semibold hover:bg-blue-800  transition disabled:opacity-50"
                onClick={async () => {
                  try {
                    await closeJobs(job.id);
                    setJob({ ...job, closed: !job.closed });
                  } catch (err) {
                    // Optionally show error
                  }
                }}
              >
                {job.closed ? "Closed" : "Close Job"}
              </button>
            </div>
          </TabsContent>

          {/* Applicants Tab */}
          <TabsContent
            value="APPLICANTS"
            className="pt-6 space-y-6 bg-transparent"
          >
            {appsLoading ? (
              <p className="text-gray-500 italic">Loading applicants…</p>
            ) : applications.length === 0 ? (
              <p className="text-gray-400 text-center">
                No one has applied yet.
              </p>
            ) : (
              <Tabs defaultValue="ALL" className="space-y-6">
                {/* Custom Stylish Tab Buttons */}
                <TabsList className="flex gap-3 p-2 bg-transparent mt-6">
                  {["ALL", "INTERVIEW", "HIRED"].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className="flex-1 px-4 py-2 text-sm font-medium text-center rounded-lg transition-all duration-200
          data-[state=active]:text-white
          data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-700
          hover:bg-gray-200"
                    >
                      {tab.charAt(0) + tab.slice(1).toLowerCase()} (
                      {filterByStatus(tab).length})
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Tab Panels */}
                {["ALL", "INTERVIEW", "HIRED"].map((status) => (
                  <TabsContent
                    key={status}
                    value={status}
                    className="space-y-4"
                  >
                    {filterByStatus(status).length === 0 ? (
                      <p className="text-gray-400 text-center">
                        No {status.toLowerCase()} applications.
                      </p>
                    ) : (
                      <ul className="space-y-4">
                        {filterByStatus(status).map((app) => (
                          <li
                            key={`${app.jobSeekerId}-${app.appliedAt}`}
                            className="p-4 bg-white border rounded-xl shadow-sm flex justify-between items-center hover:shadow-md transition"
                          >
                            <div className="flex items-center gap-4">
                              <img
                                src={`http://localhost:8080${app.profilePictureUrl}`}
                                alt="Profile"
                                className="w-12 h-12 rounded-full object-cover border"
                              />
                              <div>
                                <p className="font-semibold text-gray-900">
                                  {app.jobSeekerName}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Applied{" "}
                                  {new Date(app.appliedAt).toLocaleString()}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <span
                                className={`px-2 py-1 rounded text-sm font-medium
                        ${
                          app.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : app.status === "ACCEPTED"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-600 text-white"
                        }`}
                              >
                                {app.status}
                              </span>
                              <button
                                onClick={() => previewResume(app.id)}
                                className="px-4 py-2 text-sm font-semibold rounded-lg bg-white shadow-md transition duration-300 hover:shadow-lg hover:scale-105"
                              >
                                <span className="bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
                                  Download Resume
                                </span>
                              </button>

                              <button
                                onClick={() =>
                                  router.push(`/employer/candidates/${app.id}`)
                                }
                                className="px-4 py-2 text-sm font-semibold rounded-lg bg-white shadow-md transition duration-300 hover:shadow-lg hover:scale-105"
                              >
                                <span className="bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
                                  View
                                </span>
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

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
