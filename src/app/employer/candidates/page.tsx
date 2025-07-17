"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import {
  fetchAllApplication,
  fetchApplicationsForJob,
} from "@/model/clients/application-client";
import {
  ApplicationStatus,
  EmployerCandidateViewDto,
} from "@/model/domains/candidate.domain";
import { useAccessToken } from "@/model/stores/use-accessToken";

export default function GlobalCandidatesPage() {
  const [candidates, setCandidates] = useState<EmployerCandidateViewDto[]>([]);
  const [filtered, setFiltered] = useState<EmployerCandidateViewDto[]>([]);
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">(
    "all"
  );
  const [jobFilter, setJobFilter] = useState<number | "all">("all");

  const router = useRouter();
  const token = useAccessToken((s) => s.accessToken);

  useEffect(() => {
    if (!token) return;
    async function load() {
      if (jobFilter === "all") {
        const data = await fetchAllApplication();
        setCandidates(data);
      }
    }
    load();
  }, [jobFilter, token]);

  // Apply search and status filters on loaded candidates
  useEffect(() => {
    let temp = [...candidates];

    if (search) {
      const term = search.toLowerCase();
      temp = temp.filter(
        (c) =>
          c.jobSeekerName.toLowerCase().includes(term) ||
          c.skills.some((skill) => skill.toLowerCase().includes(term))
      );
    }
    if (statusFilter !== "all") {
      temp = temp.filter((c) => c.status === statusFilter);
    }
    setFiltered(temp);
  }, [search, statusFilter, candidates]);

  return (
    <div className="p-6 lg:p-10 bg-gradient-to-r from-white via-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
        Candidate Dashboard
      </h1>

      <Card className="mb-8 shadow-lg rounded-2xl">
        <CardContent className="flex flex-wrap gap-6 items-center justify-center mt-4">
          <Input
            placeholder="🔍 Search by name or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[220px] bg-gray-100"
          />

          <Select value={statusFilter}>
            <SelectTrigger className="w-[160px] bg-gray-100">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="NEW">New</SelectItem>
              <SelectItem value="REVIEWED">Reviewed</SelectItem>
              <SelectItem value="INTERVIEW">Interview</SelectItem>
              <SelectItem value="HIRED">Hired</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={jobFilter.toString()}
            onValueChange={(v) => setJobFilter(v === "all" ? "all" : Number(v))}
          >
            <SelectTrigger className="w-[240px] bg-gray-100">
              <SelectValue placeholder="All Jobs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Jobs</SelectItem>
              {/* TODO: Dynamically list unique jobIds and titles from candidates */}
            </SelectContent>
          </Select>

          <Button
            onClick={() => {
              /* Bulk actions */
            }}
            className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md"
          >
            Bulk Actions
          </Button>
        </CardContent>
      </Card>

      {/* Candidates Table */}
      <div className="overflow-x-auto rounded-2xl shadow-lg">
        <Table className="min-w-full bg-white rounded-2xl">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>Name</TableHead>
              <TableHead>Job</TableHead>
              <TableHead>Applied On</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((c, idx) => (
              <TableRow
                key={c.applicationId}
                onClick={() =>
                  router.push(`/employer/candidates/${c.applicationId}`)
                }
                className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <TableCell>
                  <div className="flex items-center gap-4">
                    <img
                      src={c.profilePictureUrl || undefined}
                      alt={c.jobSeekerName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {c.jobSeekerName}
                      </p>
                      <p className="text-sm text-gray-500">{c.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-gray-700 font-medium">
                  {c.jobTitle}
                </TableCell>
                <TableCell className="text-gray-600">
                  {new Date(c.appliedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge variant="default" className="px-3 py-1 text-sm">
                    {c.status.charAt(0).toUpperCase() +
                      c.status.slice(1).toLowerCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  {/* Empty, row click handles navigation */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
