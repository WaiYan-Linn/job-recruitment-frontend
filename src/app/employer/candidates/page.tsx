"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccessToken } from "@/model/stores/use-accessToken";
import {
  EmployerCandidateViewDto,
  ApplicationStatus,
} from "@/model/domains/candidate.domain";

type JobOption = {
  id: number;
  title: string;
};
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  fetchAllApplication,
  getApplicationsByJob,
  getApplicationsByStatus,
  previewResume,
} from "@/model/clients/application-client";
import { fetchJobsByEmployer } from "@/model/clients/job-client";

export default function GlobalCandidatesPage() {
  const [candidates, setCandidates] = useState<EmployerCandidateViewDto[]>([]);
  const [total, setTotal] = useState<EmployerCandidateViewDto[]>([]);

  const [filtered, setFiltered] = useState<EmployerCandidateViewDto[]>([]);
  const [jobOptions, setJobOptions] = useState<JobOption[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">(
    "all"
  );
  const [jobFilter, setJobFilter] = useState<number | string | "all">("all");
  const [loading, setLoading] = useState(true);

  const token = useAccessToken((s) => s.accessToken);
  const router = useRouter();

  useEffect(() => {
    if (!token) return;

    const fetchJobs = async () => {
      try {
        const data = await fetchJobsByEmployer(0, 100);
        const jobs: JobOption[] = data.contents.map((job: any) => ({
          id: job.id,
          title: job.title,
        }));
        setJobOptions(jobs);
      } catch (error) {
        console.error("Failed to fetch jobs by employer:", error);
        setJobOptions([]);
      }
    };

    fetchJobs();
  }, [token]);

  useEffect(() => {
    if (!token) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        let data: EmployerCandidateViewDto[] = [];
        const all = await fetchAllApplication();
        setTotal(all);

        if (jobFilter !== "all" && statusFilter !== "all") {
          const all = await fetchAllApplication();
          data = all.filter(
            (c) => c.jobId === jobFilter && c.status === statusFilter
          );
        } else if (jobFilter !== "all") {
          const res = await getApplicationsByJob(Number(jobFilter)); // ✅ Ensure number
          data = Array.isArray(res) ? res : [res];
        } else if (statusFilter !== "all") {
          const res = await getApplicationsByStatus(
            statusFilter as ApplicationStatus
          ); // ✅ Ensure valid enum
          data = Array.isArray(res) ? res : [res];
        } else {
          data = await fetchAllApplication();
        }

        setCandidates(data);
      } catch (err) {
        console.error("Error loading candidates:", err);
        setCandidates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, jobFilter, statusFilter]);

  useEffect(() => {
    const term = search.trim().toLowerCase();
    const results = !term
      ? candidates
      : candidates.filter((c) =>
          [c.jobSeekerName, c.email, c.jobTitle, c.address, ...c.skills].some(
            (val) => val.toLowerCase().includes(term)
          )
        );
    setFiltered(results);
  }, [search, candidates, total]);

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setJobFilter("all");
  };

  const getStatusColor = (status: ApplicationStatus) => {
    const colors: Record<ApplicationStatus, string> = {
      NEW: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200",
      INTERVIEW: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200",
      HIRED: "bg-green-100 text-green-800 border-green-200 hover:bg-green-200",
      REJECTED: "bg-red-100 text-red-800 border-red-200 hover:bg-red-200",
    };
    return colors[status] ?? "bg-gray-100 text-gray-800 border-gray-200";
  };

  const formatStatus = (status: ApplicationStatus) =>
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-b-4 border-blue-500 rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Loading candidates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="p-6 lg:p-10">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
                Candidate Dashboard
              </h1>
              <p className="text-gray-600 text-lg">
                Manage and review job applications efficiently
              </p>
            </div>
            <div className="hidden md:flex gap-4">
              <InfoBox label="Total Applications" value={total.length} />
              <InfoBox label="Showing Results" value={filtered.length} />
            </div>
          </div>
        </div>

        <Card className="mb-8 shadow-md border border-gray-200 rounded-xl">
          <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <Select
                value={statusFilter}
                onValueChange={(v) =>
                  setStatusFilter(v as ApplicationStatus | "all")
                }
              >
                <SelectTrigger className="bg-white border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="NEW">New</SelectItem>
                  <SelectItem value="INTERVIEW">Interview</SelectItem>
                  <SelectItem value="HIRED">Hired</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Job Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job
              </label>
              <Select
                value={jobFilter.toString()}
                onValueChange={(v) =>
                  setJobFilter(v === "all" ? "all" : Number(v))
                }
              >
                <SelectTrigger className="bg-white border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm">
                  <SelectValue placeholder="All Jobs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Jobs</SelectItem>
                  {jobOptions.map((job) => (
                    <SelectItem key={job.id} value={job.id.toString()}>
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Clear Button */}
            <div className="flex items-end">
              <Button
                onClick={clearFilters}
                variant="outline"
                className="w-full border-gray-300 hover:bg-gray-100 transition text-sm font-medium"
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="shadow-xl bg-white/90 border-0 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-50">
                  <TableHead>Candidate</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Resume</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((c) => (
                  <TableRow
                    key={c.applicationId}
                    className="hover:bg-blue-50 cursor-pointer"
                    onClick={() =>
                      router.push(`/employer/candidates/${c.applicationId}`)
                    }
                  >
                    <TableCell>
                      <div className="flex gap-4 items-center">
                        <img
                          src={`http://localhost:8080` + c.profilePictureUrl}
                          alt={c.jobSeekerName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium">{c.jobSeekerName}</p>
                          <p className="text-sm text-gray-500">{c.email}</p>
                          <p className="text-xs text-gray-400">
                            {c.phoneNumber}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{c.jobTitle}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p>{new Date(c.appliedAt).toLocaleDateString()}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(c.appliedAt).toLocaleTimeString()}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${getStatusColor(c.status)} px-3 py-1`}
                      >
                        {formatStatus(c.status)}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      {c.resumeUrl && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-blue-600 hover:text-blue-700 bg-gray-100"
                          onClick={() => previewResume(c.applicationId)}
                        >
                          Download
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <p className="text-lg font-semibold mb-2">
                  No candidates found
                </p>
                <p className="mb-4">
                  {search || statusFilter !== "all" || jobFilter !== "all"
                    ? "Try adjusting your filters or search query."
                    : "No applications submitted yet."}
                </p>
                <Button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

const InfoBox = ({ label, value }: { label: string; value: number }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20 text-center">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-2xl font-bold text-indigo-600">{value}</p>
  </div>
);
