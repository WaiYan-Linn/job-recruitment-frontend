"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bell,
  Calendar,
  ChevronDown,
  FilePlus,
  Menu,
  MessageSquare,
  Search,
  Settings,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Mock data for charts and stats
const applicationData = [
  { name: "Jan", applications: 45 },
  { name: "Feb", applications: 52 },
  { name: "Mar", applications: 61 },
  { name: "Apr", applications: 67 },
  { name: "May", applications: 55 },
  { name: "Jun", applications: 71 },
  { name: "Jul", applications: 82 },
];

const recentApplicants = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "UX Designer",
    status: "interview",
    avatar: "SJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Frontend Developer",
    status: "review",
    avatar: "MC",
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "Product Manager",
    status: "new",
    avatar: "AP",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Data Analyst",
    status: "interview",
    avatar: "DK",
  },
];

const upcomingInterviews: any = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "UX Designer",
    time: "10:00 AM",
    date: "Today",
  },
  {
    id: 2,
    name: "David Kim",
    role: "Data Analyst",
    time: "2:30 PM",
    date: "Tomorrow",
  },
  {
    id: 3,
    name: "James Wilson",
    role: "Backend Developer",
    time: "11:15 AM",
    date: "May 5",
  },
];

export default function EmployerDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(75), 500);
    return () => clearTimeout(timer);
  }, []);

  const getStatusBadge = (status: any) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-500">New</Badge>;
      case "review":
        return <Badge className="bg-yellow-500">In Review</Badge>;
      case "interview":
        return <Badge className="bg-green-500">Interview</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-300 flex-col md:flex-row ">
      {/* Content Area */}
      <div className="flex-1  ">
        {/* Top Navigation */}
        <div className=" z-10 bg-white dark:bg-gray-300 shadow fixed top-0 w-full md:relative md:top-auto md:shadow-none">
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold ml-2 md:ml-0 dark:text-gray-900">
                Dashboard
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 w-64"
                />
              </div>
              <Link href="/employer/job-posting/">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <FilePlus className="w-4 h-4" />
                  <span className="hidden sm:inline">Post a Job</span>
                </Button>
              </Link>

              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="hidden md:flex items-center space-x-2"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/api/placeholder/32/32" alt="Profile" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="pt-16 mt-24   md:m-0 p-4 md:p-6">
          {/* Dashboard Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm font-medium">
                  Total Positions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-green-500">+2 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm font-medium">
                  Active Applicants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">237</div>
                <p className="text-xs text-green-500">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm font-medium">
                  Interviews Scheduled
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28</div>
                <p className="text-xs text-green-500">Next: Today, 10:00 AM</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm font-medium">
                  Hiring Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="">
                <Progress value={progress} className="h-2 " />
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <div>75% Complete</div>
                  <div>May 15 Target</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trends & Upcoming Interviews */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Application Trends</CardTitle>
                <CardDescription>Monthly application volume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={applicationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="applications"
                        stroke="#3b82f6"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Interviews</CardTitle>
                <CardDescription>Next 3 scheduled interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingInterviews.map((interview: any) => (
                    <div key={interview.id} className="flex items-center">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {interview.name
                            .split(" ")
                            .map((n: any) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium">{interview.name}</p>
                        <p className="text-xs text-gray-500">
                          {interview.role}
                        </p>
                      </div>
                      <div className="ml-auto text-right">
                        <p className="text-sm font-medium">{interview.time}</p>
                        <p className="text-xs text-gray-500">
                          {interview.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Interviews
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Recent Applicants Table */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Applicants</CardTitle>
              <CardDescription>Latest candidates who applied</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-gray-500 border-b">
                    <tr>
                      <th className="p-2 pl-0">Applicant</th>
                      <th className="p-2">Position</th>
                      <th className="p-2">Status</th>
                      <th className="p-2 pr-0 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentApplicants.map((applicant) => (
                      <tr key={applicant.id} className="border-b">
                        <td className="py-3 pl-0">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {applicant.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <span className="ml-2 font-medium">
                              {applicant.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3">{applicant.role}</td>
                        <td className="py-3">
                          {getStatusBadge(applicant.status)}
                        </td>
                        <td className="py-3 pr-0 text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Applicants
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
}
