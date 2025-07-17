// File: app/candidates/[id]/page.tsx (CandidateDetailPage)
"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  EmployerCandidateViewDto,
  ApplicationStatus,
} from "@/model/domains/candidate.domain";
import { fetchApplicationDetails } from "@/model/clients/application-client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAccessToken } from "@/model/stores/use-accessToken";

export default function CandidateDetailPage() {
  const { id } = useParams();
  const applicationId = Number(id);
  const [data, setData] = useState<EmployerCandidateViewDto | null>(null);
  const [loading, setLoading] = useState(true);
  const token = useAccessToken((s) => s.accessToken);

  useEffect(() => {
    if (!token) return;
    async function loadDetail() {
      const detail = await fetchApplicationDetails(applicationId);
      setData(detail);
      setLoading(false);
    }
    loadDetail();
  }, [applicationId, token]);

  const updateStatus = async (status: ApplicationStatus) => {
    await fetch(
      `/api/employer/applications/${applicationId}/status?status=${status}`,
      {
        method: "PATCH",
      }
    );
    setData((prev: any) => prev && { ...prev, status });
  };

  if (loading || !data) return <p className="p-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">
      <Card className="shadow-md">
        <CardContent className="flex gap-6 p-6">
          <img
            src={data.profilePictureUrl || undefined}
            alt={data.jobSeekerName}
            className="w-24 h-24 rounded-full border-2 border-blue-200"
          />
          <div>
            <h2 className="text-2xl font-bold">{data.jobSeekerName}</h2>
            <p className="text-gray-600">{data.email}</p>
            <p className="text-sm mt-1">
              Applied: {new Date(data.appliedAt).toLocaleDateString()}
            </p>
            <Badge className="mt-2">
              {data.status.charAt(0).toUpperCase() +
                data.status.slice(1).toLowerCase()}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <h3 className="font-semibold">Job Title</h3>
            <p>{data.jobTitle}</p>
            <p className="text-sm text-gray-500">{data.jobTitle}</p>
          </div>

          <div>
            <h3 className="font-semibold">Profile Summary</h3>
            <p className="text-gray-700 whitespace-pre-wrap">
              {data.profileSummary}
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Skills</h3>
            <div className="flex gap-2 flex-wrap">
              {data.skills.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </div>

          {data.resumeUrl && (
            <div>
              <h3 className="font-semibold">Resume</h3>
              <a
                href={data.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Download Resume
              </a>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-end">
        <Button onClick={() => updateStatus("INTERVIEW")}>Interview</Button>
        <Button
          onClick={() => updateStatus("HIRED")}
          className="bg-green-600 hover:bg-green-700"
        >
          Hire
        </Button>
        <Button
          onClick={() => updateStatus("REJECTED")}
          className="bg-red-600 hover:bg-red-700"
        >
          Reject
        </Button>
      </div>
    </div>
  );
}
