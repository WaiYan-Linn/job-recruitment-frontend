"use client";

import { useEffect, useState } from "react";
import { fetchAllApplications } from "@/model/clients/jobseeker-client";
import { useAccessToken } from "@/model/stores/use-accessToken";
import toast from "react-hot-toast";
import { ApplicationInfo } from "@/model/domains/application.domain";
import Link from "next/link";
import { Loader2, Building, Calendar, User, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "new":
      return "bg-yellow-100 text-yellow-800 border border-yellow-300";
    case "interview":
      return "bg-blue-100 text-blue-800 border border-blue-300";
    case "hired":
      return "bg-green-100 text-green-800 border border-green-300";
    case "rejected":
      return "bg-red-100 text-red-800 border border-red-300";
    default:
      return "bg-gray-100 text-gray-800 border border-gray-300";
  }
};

export default function JobSeekerApplicationsPage() {
  const [applications, setApplications] = useState<ApplicationInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useAccessToken((s) => s.accessToken);

  useEffect(() => {
    if (!token) return;
    const loadApplications = async () => {
      try {
        const appList = await fetchAllApplications();
        setApplications(appList);
        console.log("Applications loaded:", appList);
      } catch (err) {
        console.error("Error loading applications:", err);
        toast.error("Failed to load applications.");
      } finally {
        setLoading(false);
      }
    };
    loadApplications();
  }, [token]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
        <p className="text-gray-600">Loading your applications...</p>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
        <User className="h-12 w-12 text-muted-foreground" />
        <h2 className="text-xl font-semibold text-gray-800">
          No Applications Yet
        </h2>
        <p className="text-sm text-gray-500">
          Once you apply for jobs, they will show up here.
        </p>
        <Button asChild>
          <Link href="/jobs">Start Browsing Jobs</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="px-2 sm:px-6 py-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 ">My Applications</h1>
        <p className="text-gray-600 mt-1">Track your job applications below.</p>
      </div>

      <div className="space-y-6">
        {applications.map((app) => (
          <div
            key={app.applicationId}
            className="flex gap-4 p-4 border border-gray-200 rounded-xl bg-white shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex-shrink-0">
              <img
                src={`http://localhost:8080` + app.profilePictureUrl}
                alt={app.companyName}
                width={64}
                height={64}
                className="rounded-full border object-cover"
              />
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-muted-foreground" />
                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                      {app.JobTitle}
                    </h2>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center mt-1">
                    <Building className="h-4 w-4 mr-1" />
                    {app.companyName}
                  </div>
                </div>

                <Badge
                  className={`text-xs px-2 py-0.5 ${getStatusColor(
                    app.status
                  )}`}
                >
                  {app.status.charAt(0).toUpperCase() +
                    app.status.slice(1).toLowerCase()}
                </Badge>
              </div>

              <div className="flex items-center text-sm text-muted-foreground mt-2">
                <Calendar className="h-4 w-4 mr-1" />
                Applied on:{" "}
                {new Date(app.appliedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>

              {app.status === "INTERVIEW" &&
                app.dateTime &&
                app.dateTime !== "1970-01-01T00:00:00" && (
                  <div className="bg-blue-50 border border-blue-200 rounded-md px-3 py-2 mt-2">
                    <p className="text-blue-800 font-medium">
                      Interview Scheduled
                    </p>
                    <p className="text-blue-700">
                      {new Date(app.dateTime).toLocaleString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    {app.location && (
                      <p className="text-blue-600">Location: {app.location}</p>
                    )}
                  </div>
                )}

              <div className="pt-3">
                <Button asChild size="sm" variant="outline">
                  <Link href={`/jobseeker/application/${app.applicationId}`}>
                    View Details
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
