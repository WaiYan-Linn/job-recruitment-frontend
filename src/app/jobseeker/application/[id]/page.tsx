"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchApplicationInfo } from "@/model/clients/jobseeker-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAccessToken } from "@/model/stores/use-accessToken";
import {
  Loader2,
  Calendar,
  Clock,
  MapPin,
  StickyNote,
  Building,
  Briefcase,
  FileText,
} from "lucide-react";
import toast from "react-hot-toast";
import { ApplicationInfo } from "@/model/domains/application.domain";
import Link from "next/link";

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "new":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "interview":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "hired":
      return "bg-green-100 text-green-800 border-green-200";
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function JobSeekerApplicationDetailPage() {
  const { id } = useParams();
  const applicationId = Number(id);
  const [data, setData] = useState<ApplicationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const token = useAccessToken((s) => s.accessToken);

  useEffect(() => {
    if (!token || isNaN(applicationId) || applicationId <= 0) {
      if (!isNaN(applicationId) && applicationId > 0) {
        toast.error("Invalid application identifier.");
      }
      setLoading(false);
      return;
    }

    async function loadDetail() {
      try {
        const detail = await fetchApplicationInfo(applicationId);
        setData(detail);
      } catch (err: any) {
        console.error("Error loading application details:", err);
        if (err?.response?.status === 404) {
          toast.error("Application details not found.");
        } else {
          toast.error("Failed to load application details. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadDetail();
  }, [applicationId, token]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600 mr-2" />
          <p className="text-lg text-gray-600">
            Loading application details...
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Application Not Found
        </h2>
        <p className="text-gray-600 mb-4">
          The requested application details could not be loaded.
        </p>
        <Button asChild>
          <Link href="/jobseeker/application">Back to Applications</Link>
        </Button>
      </div>
    );
  }

  const hasInterview =
    ["INTERVIEW", "HIRED", "REJECTED"].includes(data.status) &&
    data.dateTime &&
    data.dateTime !== "1970-01-01T00:00:00";

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header Section */}
      <Card className="shadow-md border border-gray-200">
        <CardContent className="p-6 flex flex-col sm:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-xl bg-gray-100 border flex items-center justify-center">
              <img
                src={`http://localhost:8080` + data.profilePictureUrl}
                alt={data.companyName}
                width={64}
                height={64}
                className="rounded-full border object-cover"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Application for {data.JobTitle}
                </h1>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Applied on{" "}
                  {new Date(data.appliedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <Badge
                className={`px-3 py-1 text-sm font-semibold border ${getStatusColor(
                  data.status
                )}`}
                variant="outline"
              >
                {data.status.charAt(0).toUpperCase() +
                  data.status.slice(1).toLowerCase()}
              </Badge>
            </div>
            <div className="text-sm text-gray-700 font-medium flex items-center gap-1">
              <Briefcase className="h-4 w-4" /> {data.companyName}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interview Section */}
      {hasInterview && (
        <Card className="shadow-md border border-gray-200">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" /> Interview Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="text-gray-800">
              <p className="text-sm text-gray-500 mb-1">Date & Time</p>
              <p className="font-medium">
                {new Date(data.dateTime).toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            {data.location && (
              <div className="text-gray-800">
                <p className="text-sm text-gray-500 mb-1">Location</p>
                <p className="font-medium flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-purple-600" /> {data.location}
                </p>
              </div>
            )}
            {data.notes && (
              <div className="text-gray-800">
                <p className="text-sm text-gray-500 mb-1">Notes</p>
                <p className="font-medium whitespace-pre-wrap flex items-start gap-1">
                  <StickyNote className="h-4 w-4 text-purple-600 mt-0.5" />{" "}
                  {data.notes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Job Section */}
      <Card className="shadow-md border border-gray-200">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" /> Position Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {data.JobTitle}
          </h3>
          <p className="text-sm text-gray-500 italic">
            {data.jobDescription || "No description provided."}
          </p>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card className="shadow-md border border-gray-200">
        <CardContent className="p-6 flex justify-between items-center flex-wrap gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Application Status
            </h3>
            <p className="text-gray-600">
              Your application is currently{" "}
              <span className="font-medium">
                {data.status.charAt(0).toUpperCase() +
                  data.status.slice(1).toLowerCase()}
              </span>
              .
            </p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/jobseeker/application">Back to List</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
