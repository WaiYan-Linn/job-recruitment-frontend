// File: app/candidates/[id]/page.tsx (Enhanced CandidateDetailPage)
"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  EmployerCandidateViewDto,
  ApplicationStatus,
} from "@/model/domains/candidate.domain";
import {
  fetchApplicationDetails,
  previewResume,
  updateApplicationStatus,
} from "@/model/clients/application-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAccessToken } from "@/model/stores/use-accessToken";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { scheduleInterview } from "@/model/clients/application-client";
import {
  Loader2,
  Mail,
  CheckCircle,
  XCircle,
  Calendar,
  User,
  Briefcase,
  FileText,
  Clock,
} from "lucide-react";

export default function CandidateDetailPage() {
  const { id } = useParams();
  const applicationId = Number(id);
  const [data, setData] = useState<EmployerCandidateViewDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [loadingStates, setLoadingStates] = useState({
    interview: false,
    hire: false,
    reject: false,
  });
  const [form, setForm] = useState({
    dateTime: "",
    location: "",
    notes: "",
  });

  const token = useAccessToken((s) => s.accessToken);

  const setLoadingState = (
    action: keyof typeof loadingStates,
    state: boolean
  ) => {
    setLoadingStates((prev) => ({ ...prev, [action]: state }));
  };

  const handleScheduleInterview = async () => {
    setLoadingState("interview", true);
    try {
      await scheduleInterview(applicationId, form);
      await updateStatus("INTERVIEW");
      setOpen(false);
      setForm({ dateTime: "", location: "", notes: "" }); // Reset form
    } catch (error) {
      console.error("Error scheduling interview:", error);
      // You might want to show an error toast here
    } finally {
      setLoadingState("interview", false);
    }
  };

  const handleHire = async () => {
    setLoadingState("hire", true);
    try {
      await updateStatus("HIRED");
    } catch (error) {
      console.error("Error hiring candidate:", error);
    } finally {
      setLoadingState("hire", false);
    }
  };

  const handleReject = async () => {
    setLoadingState("reject", true);
    try {
      await updateStatus("REJECTED");
    } catch (error) {
      console.error("Error rejecting candidate:", error);
    } finally {
      setLoadingState("reject", false);
    }
  };

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
    await updateApplicationStatus(applicationId, status);
    setData((prev) => prev && { ...prev, status });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
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

  if (loading || !data) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <p className="text-lg text-gray-600">
              Loading candidate details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header Card */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-white to-blue-50">
        <CardContent className="p-8">
          <div className="flex items-start gap-8">
            <div className="relative">
              <img
                src={
                  `http://localhost:8080` + data.profilePictureUrl ||
                  "/default-avatar.png"
                }
                alt={data.jobSeekerName}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/default-avatar.png";
                }}
              />
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1">
                <User className="h-4 w-4 text-blue-600" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {data.jobSeekerName}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <Mail className="h-4 w-4" />
                    <span className="text-lg">{data.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Clock className="h-4 w-4" />
                    <span>
                      Applied on{" "}
                      {new Date(data.appliedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <Badge
                  className={`px-4 py-2 text-sm font-semibold border ${getStatusColor(
                    data.status
                  )}`}
                  variant="outline"
                >
                  {data.status.charAt(0).toUpperCase() +
                    data.status.slice(1).toLowerCase()}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Information Card */}
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Position Applied For
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {data.jobTitle}
          </h3>
          <p className="text-gray-600">{data.jobTitle}</p>
        </CardContent>
      </Card>

      {/* Profile & Skills Card */}
      <Card className="shadow-lg border-0">
        <CardContent className="p-8 space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              Profile Summary
            </h3>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {data.profileSummary}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Skills & Expertise
            </h3>
            <div className="flex gap-3 flex-wrap">
              {data.skills.map((skill, index) => (
                <Badge
                  key={skill}
                  className="px-4 py-2 bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-200"
                  variant="secondary"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {data.resumeUrl && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Resume
              </h3>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                <button
                  onClick={() => previewResume(data.applicationId)}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                >
                  <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                    Download Resume
                  </span>
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-white to-gray-50">
        <CardContent className="p-6">
          <div className="flex gap-4 justify-end">
            <Button
              onClick={() => setOpen(true)}
              disabled={
                data.status === "INTERVIEW" ||
                data.status === "HIRED" ||
                data.status === "REJECTED" ||
                loadingStates.interview
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 flex items-center gap-2"
            >
              {loadingStates.interview ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Scheduling...
                </>
              ) : (
                <>
                  <Calendar className="h-4 w-4" />
                  Schedule Interview
                </>
              )}
            </Button>

            <Button
              onClick={handleHire}
              disabled={
                loadingStates.hire ||
                data.status === "HIRED" ||
                data.status === "REJECTED"
              }
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 flex items-center gap-2"
            >
              {loadingStates.hire ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Hire Candidate
                </>
              )}
            </Button>

            <Button
              onClick={handleReject}
              disabled={
                loadingStates.reject ||
                data.status === "HIRED" ||
                data.status === "REJECTED"
              }
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 flex items-center gap-2"
            >
              {loadingStates.reject ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4" />
                  Reject Candidate
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Interview Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Schedule Interview
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 pt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date & Time
              </label>
              <Input
                type="datetime-local"
                value={form.dateTime}
                onChange={(e) => setForm({ ...form, dateTime: e.target.value })}
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <Input
                placeholder="e.g., Office Room 301 or Zoom Meeting"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <Textarea
                placeholder="Additional information or instructions for the candidate..."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full resize-none"
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => setOpen(false)}
                variant="outline"
                className="flex-1"
                disabled={loadingStates.interview}
              >
                Cancel
              </Button>
              <Button
                onClick={handleScheduleInterview}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={
                  loadingStates.interview || !form.dateTime || !form.location
                }
              >
                {loadingStates.interview ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Invitation
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
