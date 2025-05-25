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

// Type definitions
interface Candidate {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  jobId: string;
  jobTitle: string;
  appliedAt: string; // ISO date string
  status: "new" | "reviewed" | "interview" | "hired" | "rejected";
  skills: string[];
}

interface GlobalCandidatesPageProps {}

export default function GlobalCandidatesPage({}: GlobalCandidatesPageProps) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filtered, setFiltered] = useState<Candidate[]>([]);
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [jobFilter, setJobFilter] = useState<string>("all");

  // Fetch candidates on mount
  useEffect(() => {
    fetch("/api/employer/candidates")
      .then((res) => res.json())
      .then((data: Candidate[]) => {
        setCandidates(data);
        setFiltered(data);
      });
  }, []);

  // Filter logic
  useEffect(() => {
    let temp = [...candidates];

    if (search) {
      const term = search.toLowerCase();
      temp = temp.filter(
        (c) =>
          c.name.toLowerCase().includes(term) ||
          c.skills.some((skill) => skill.toLowerCase().includes(term))
      );
    }
    if (statusFilter !== "all") {
      temp = temp.filter((c) => c.status === statusFilter);
    }
    if (jobFilter !== "all") {
      temp = temp.filter((c) => c.jobId === jobFilter);
    }

    setFiltered(temp);
  }, [search, statusFilter, jobFilter, candidates]);

  return (
    <div className="p-6 lg:p-10 bg-gradient-to-r from-white via-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
        Candidate Dashboard
      </h1>

      <Card className="mb-8 shadow-lg  rounded-2xl">
        <CardContent className="flex flex-wrap gap-6 items-center justify-center mt-4">
          <Input
            placeholder="🔍 Search by name or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[220px] bg-gray-100"
          />

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px] bg-gray-100">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="reviewed">Reviewed</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Select value={jobFilter} onValueChange={setJobFilter}>
            <SelectTrigger className="w-[240px] bg-gray-100">
              <SelectValue placeholder="All Jobs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Jobs</SelectItem>
              {/* TODO: Dynamically populate with job list */}
            </SelectContent>
          </Select>

          <Button
            onClick={() => {
              /* TODO: Bulk actions handler */
            }}
            className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md"
          >
            Bulk Actions
          </Button>
        </CardContent>
      </Card>

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
                key={c.id}
                className={`hover:bg-gray-50 transition-colors ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <TableCell>
                  <div className="flex items-center gap-4">
                    <img
                      src={c.avatarUrl}
                      alt={c.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{c.name}</p>
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
                    {capitalize(c.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      (window.location.href = `/candidates/${c.id}`)
                    }
                    className="px-4 py-1 rounded-full"
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// Utility functions
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function statusVariant(
  status: Candidate["status"]
): "secondary" | "outline" | "destructive" | "default" | "warning" {
  switch (status) {
    case "new":
      return "secondary";
    case "reviewed":
      return "outline";
    case "interview":
      return "destructive";
    case "hired":
      return "default";
    case "rejected":
      return "warning";
    default:
      return "default";
  }
}
