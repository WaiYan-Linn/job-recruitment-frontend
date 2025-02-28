"use client";

import { useState } from "react";
import {
  Briefcase,
  Users,
  FileText,
  BarChart2,
  MessageSquare,
  Plus,
  Filter,
  Search,
  ArrowUpRight,
  Clock,
  UserCheck,
  AlertCircle,
} from "lucide-react";
import custom from "@/lib/front-view-business-people-talking.jpg";

const EmployerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data - in a real application this would come from your API
  const stats = [
    {
      title: "Active Jobs",
      value: 12,
      icon: Briefcase,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
    },
    {
      title: "Total Applicants",
      value: 143,
      icon: Users,
      color:
        "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
    },
    {
      title: "Interviews Scheduled",
      value: 8,
      icon: Clock,
      color:
        "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
    },
    {
      title: "Positions Filled",
      value: 3,
      icon: UserCheck,
      color:
        "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300",
    },
  ];

  const recentApplications = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Senior Frontend Developer",
      date: "2 hours ago",
      status: "New",
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "DevOps Engineer",
      date: "5 hours ago",
      status: "Reviewed",
    },
    {
      id: 3,
      name: "Jessica Park",
      position: "Product Manager",
      date: "1 day ago",
      status: "Interview",
    },
    {
      id: 4,
      name: "David Smith",
      position: "UX Designer",
      date: "2 days ago",
      status: "Rejected",
    },
  ];

  const activeJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      applicants: 24,
      posted: "5 days ago",
      status: "Active",
    },
    {
      id: 2,
      title: "DevOps Engineer",
      applicants: 16,
      posted: "1 week ago",
      status: "Active",
    },
    {
      id: 3,
      title: "Product Manager",
      applicants: 31,
      posted: "2 weeks ago",
      status: "Active",
    },
    {
      id: 4,
      title: "UX Designer",
      applicants: 18,
      posted: "3 weeks ago",
      status: "Closing Soon",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300";
      case "Reviewed":
        return "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300";
      case "Interview":
        return "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300";
      case "Rejected":
        return "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300";
      case "Active":
        return "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300";
      case "Closing Soon":
        return "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div
      className="pt-20 pb-16 bg-gray-50 dark:bg-gray-800 bg-cover bg-center bg-no-repeat min-h-screen"
      style={{
        backgroundImage: `url(${custom.src})`,
        // backgroundImage:
        // "url('https://img.freepik.com/free-photo/businesspeople-meeting-office-working_23-2148908920.jpg?t=st=1739979759~exp=1739983359~hmac=d1f5585d4ecc593f88039cc882890c49e2b3f74b7dbc1c4463540900196edc0f&w=996')",
        // backgroundImage:
        //   "url('https://www.risefor-career.com/images/top/RISEforCarrer_A001_TOP.png')",
        filter: "brightness(0.7)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold  bg-gradient-to-r  from-blue-500 via-purple-500 to-cyan-700  text-transparent bg-clip-text text-gray-900 dark:text-white">
              Employer Dashboard
            </h1>
            <p className="text-gray-600  bg-gradient-to-r  from-gray-800 to-black mt-2 text-transparent bg-clip-text dark:text-gray-400">
              Manage your job listings and applicants
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
              <Plus size={18} className="mr-2" />
              Post New Job
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 transition border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color} mr-4`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Tabs */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === "overview"
                    ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("jobs")}
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === "jobs"
                    ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                My Jobs
              </button>
              <button
                onClick={() => setActiveTab("applications")}
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === "applications"
                    ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Applications
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === "analytics"
                    ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Analytics
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div>
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                      Recent Applications
                    </h2>
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                      View All <ArrowUpRight size={16} className="ml-1" />
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                          >
                            Applicant
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                          >
                            Position
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                          >
                            Applied
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {recentApplications.map((app) => (
                          <tr
                            key={app.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium text-gray-900 dark:text-white">
                                {app.name}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-700 dark:text-gray-300">
                                {app.position}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {app.date}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                                  app.status
                                )}`}
                              >
                                {app.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                      Active Job Listings
                    </h2>
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                      View All <ArrowUpRight size={16} className="ml-1" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeJobs.map((job) => (
                      <div
                        key={job.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 bg-gray-50 dark:bg-gray-800 hover:shadow-md transition"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                              {job.title}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                              <span className="flex items-center">
                                <Users size={16} className="mr-1" />
                                {job.applicants} Applicants
                              </span>
                              <span className="flex items-center">
                                <Clock size={16} className="mr-1" />
                                Posted {job.posted}
                              </span>
                            </div>
                          </div>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                              job.status
                            )}`}
                          >
                            {job.status}
                          </span>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                          <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-3 py-1 border border-gray-200 dark:border-gray-700 rounded">
                            Edit
                          </button>
                          <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 px-3 py-1 border border-blue-200 dark:border-blue-700 rounded">
                            View Applicants
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "jobs" && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div className="relative w-full md:w-64 mb-4 md:mb-0">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                      placeholder="Search jobs..."
                    />
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <Filter size={16} className="mr-2" />
                      Filter
                    </button>
                    <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                      <Plus size={16} className="mr-2" />
                      Add New
                    </button>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                          >
                            Job Title
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                          >
                            Applicants
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                          >
                            Posted Date
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {activeJobs
                          .concat([
                            {
                              id: 5,
                              title: "Backend Engineer",
                              applicants: 28,
                              posted: "1 month ago",
                              status: "Closed",
                            },
                            {
                              id: 6,
                              title: "Marketing Specialist",
                              applicants: 45,
                              posted: "2 months ago",
                              status: "Closed",
                            },
                          ])
                          .map((job) => (
                            <tr
                              key={job.id}
                              className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="font-medium text-gray-900 dark:text-white">
                                  {job.title}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-700 dark:text-gray-300">
                                  {job.applicants}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {job.posted}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                                    job.status
                                  )}`}
                                >
                                  {job.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                                  View
                                </button>
                                <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300">
                                  Edit
                                </button>
                                {job.status !== "Closed" && (
                                  <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                                    Close
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "applications" && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div className="relative w-full md:w-64 mb-4 md:mb-0">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                      placeholder="Search applicants..."
                    />
                  </div>

                  <div className="flex space-x-2">
                    <select className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <option>All Jobs</option>
                      <option>Senior Frontend Developer</option>
                      <option>DevOps Engineer</option>
                      <option>Product Manager</option>
                      <option>UX Designer</option>
                    </select>
                    <select className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <option>All Statuses</option>
                      <option>New</option>
                      <option>Reviewed</option>
                      <option>Interview</option>
                      <option>Rejected</option>
                    </select>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                          >
                            Applicant
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                          >
                            Job Position
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                          >
                            Applied Date
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {recentApplications
                          .concat([
                            {
                              id: 5,
                              name: "Robert Johnson",
                              position: "Senior Frontend Developer",
                              date: "3 days ago",
                              status: "Interview",
                            },
                            {
                              id: 6,
                              name: "Emily Watson",
                              position: "UX Designer",
                              date: "4 days ago",
                              status: "Reviewed",
                            },
                            {
                              id: 7,
                              name: "Tyler Greene",
                              position: "DevOps Engineer",
                              date: "1 week ago",
                              status: "Rejected",
                            },
                            {
                              id: 8,
                              name: "Lisa Chen",
                              position: "Product Manager",
                              date: "1 week ago",
                              status: "New",
                            },
                          ])
                          .map((app) => (
                            <tr
                              key={app.id}
                              className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="font-medium text-gray-900 dark:text-white">
                                  {app.name}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-700 dark:text-gray-300">
                                  {app.position}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {app.date}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                                    app.status
                                  )}`}
                                >
                                  {app.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                                  View Resume
                                </button>
                                <button className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300">
                                  Schedule
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div>
                <div className="mb-8 text-center">
                  <AlertCircle
                    size={48}
                    className="mx-auto text-blue-600 dark:text-blue-400 mb-4"
                  />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Analytics Coming Soon
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    We're working on building comprehensive analytics for your
                    job listings and application metrics. This feature will be
                    available soon!
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-900">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Job Performance Overview
                    </h3>
                    <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500 dark:text-gray-400">
                        Chart loading soon...
                      </p>
                    </div>
                  </div>

                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-900">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Applicant Sources
                    </h3>
                    <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500 dark:text-gray-400">
                        Chart loading soon...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
