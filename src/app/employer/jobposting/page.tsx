"use client";

import { useState } from "react";
import {
  Briefcase,
  DollarSign,
  MapPin,
  Calendar,
  Home,
  X,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import custom from "@/lib/front-view-business-people-talking.jpg";

interface JobData {
  title: string;
  company: string;
  location: string;
  remoteOption: string;
  employmentType: string;
  experienceLevel: string;
  salaryMin: string;
  salaryMax: string;
  salaryCurrency: string;
  salaryPeriod: string;
  department: string;
  description: string;
  requirements: string;
  benefits: string;
  applicationDeadline: string;
  applicationEmail: string;
  applicationUrl: string;
  tags: string[];
}

export default function PostJobPage() {
  const [formStep, setFormStep] = useState(1);
  const [previewMode, setPreviewMode] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [jobData, setJobData] = useState<JobData>({
    title: "",
    company: "Your Company",
    location: "",
    remoteOption: "hybrid",
    employmentType: "full-time",
    experienceLevel: "mid",
    salaryMin: "",
    salaryMax: "",
    salaryCurrency: "USD",
    salaryPeriod: "year",
    department: "",
    description: "",
    requirements: "",
    benefits: "",
    applicationDeadline: "",
    applicationEmail: "",
    applicationUrl: "",
    tags: [],
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags((prev) => prev.filter((t) => t !== tag));
      setJobData((prev) => ({
        ...prev,
        tags: prev.tags.filter((t) => t !== tag),
      }));
    } else {
      setSelectedTags((prev) => [...prev, tag]);
      setJobData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
    setJobData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const nextStep = () => {
    setFormStep((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setFormStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const togglePreview = () => {
    setPreviewMode((prev) => !prev);
    window.scrollTo(0, 0);
  };

  const submitJob = () => {
    // API call to your Spring backend would go here
    console.log("Submitting job data:", jobData);
    setFormSubmitted(true);
    window.scrollTo(0, 0);
  };

  const popularTags = [
    "JavaScript",
    "React",
    "Node.js",
    "Java",
    "Spring",
    "Python",
    "DevOps",
    "AWS",
    "UI/UX",
    "Product Manager",
    "Marketing",
    "Sales",
  ];

  // Basic validation for each step
  const isStep1Valid = jobData.title && jobData.location && jobData.department;
  const isStep2Valid =
    jobData.salaryMin && jobData.description && jobData.requirements;
  const isStep3Valid =
    jobData.applicationDeadline &&
    (jobData.applicationEmail || jobData.applicationUrl);

  return (
    <div
      className="pt-20 pb-16 bg-cover bg-top bg-gray-50 dark:bg-gray-800 min-h-screen "
      style={{
        backgroundImage: `url(${custom.src})`,
        // backgroundImage:
        // "url('https://img.freepik.com/free-photo/businesspeople-meeting-office-working_23-2148908920.jpg?t=st=1739979759~exp=1739983359~hmac=d1f5585d4ecc593f88039cc882890c49e2b3f74b7dbc1c4463540900196edc0f&w=996')",
      }}
    >
      <div className="max-w-4xl mx-auto px-6 ">
        {/* Success Message */}
        {formSubmitted && (
          <div className="mb-8 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-6 text-center">
            <CheckCircle2
              size={48}
              className="mx-auto text-green-600 dark:text-green-400 mb-4"
            />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Job Posted Successfully!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Your job listing has been submitted and is now pending review. It
              will be visible to candidates once approved.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => (window.location.href = "/employer/dashboard")}
                className="px-5 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              >
                Return to Dashboard
              </button>
              <button
                onClick={() => {
                  setFormSubmitted(false);
                  setFormStep(1);
                  setPreviewMode(false);
                  setJobData({
                    title: "",
                    company: "Your Company",
                    location: "",
                    remoteOption: "hybrid",
                    employmentType: "full-time",
                    experienceLevel: "mid",
                    salaryMin: "",
                    salaryMax: "",
                    salaryCurrency: "USD",
                    salaryPeriod: "year",
                    department: "",
                    description: "",
                    requirements: "",
                    benefits: "",
                    applicationDeadline: "",
                    applicationEmail: "",
                    applicationUrl: "",
                    tags: [],
                  });
                  setSelectedTags([]);
                }}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Post Another Job
              </button>
            </div>
          </div>
        )}

        {!formSubmitted && (
          <>
            <div className="mb-4 text-center">
              <h1 className="relative inline-block text-4xl font-extrabold dark:text-gray-900 text-gray-900  bg-gradient-to-r  from-zinc-800 via-blue-800 to-gray-800  text-transparent bg-clip-text mb-2">
                Post a New Job
              </h1>
              <p className="text-lg italic  text-gray-900  bg-gradient-to-r  from-black via-blue-950 to-gray-800  text-transparent bg-clip-text  ">
                Create your job listing to attract top talent and find the
                perfect candidate.
              </p>
            </div>

            {/* Form Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-center">
                {/** Step Indicators */}
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                        formStep >= step
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {step}
                    </div>
                    {step !== 4 && (
                      <div
                        className={`h-1 w-44 transition-colors duration-300 ${
                          formStep > step
                            ? "bg-blue-600"
                            : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between space-x-4 mt-4 max-w-4xl mx-auto text-sm text-gray-600 dark:text-gray-400">
                <span className="w-1/4 text-center">Basic Details</span>
                <span className="w-1/4 text-center">Job Description</span>
                <span className="w-1/4 text-center">Application</span>
                <span className="w-1/4 text-center">Review</span>
              </div>
            </div>

            {/* Preview Toggle on Step 4 */}
            {formStep === 4 && (
              <div className="mb-6">
                <button
                  onClick={togglePreview}
                  className="w-full py-3 px-4 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition font-medium"
                >
                  {previewMode ? "Edit Job Details" : "Preview Job Listing"}
                </button>
              </div>
            )}

            {/* Form Content */}
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
              <div className="p-6">
                {/* Step 1: Basic Details */}
                {formStep === 1 && !previewMode && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                      Basic Job Details
                    </h2>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Job Title*
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Briefcase size={18} className="text-gray-400" />
                            </div>
                            <input
                              type="text"
                              name="title"
                              value={jobData.title}
                              onChange={handleInputChange}
                              className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                              placeholder="e.g. Senior Frontend Developer"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Department*
                          </label>
                          <input
                            type="text"
                            name="department"
                            value={jobData.department}
                            onChange={handleInputChange}
                            className="block w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                            placeholder="e.g. Engineering, Marketing"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Location*
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin size={18} className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="location"
                            value={jobData.location}
                            onChange={handleInputChange}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                            placeholder="e.g. New York, NY"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Remote Options
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {/* On-site */}
                          <label
                            className={`flex items-center border rounded-lg p-3 cursor-pointer ${
                              jobData.remoteOption === "onsite"
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                : "border-gray-200 dark:border-gray-700"
                            }`}
                          >
                            <input
                              type="radio"
                              name="remoteOption"
                              value="onsite"
                              checked={jobData.remoteOption === "onsite"}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <Home
                              size={20}
                              className={`mr-2 ${
                                jobData.remoteOption === "onsite"
                                  ? "text-blue-600 dark:text-blue-400"
                                  : "text-gray-400"
                              }`}
                            />
                            <div>
                              <span
                                className={`block font-medium ${
                                  jobData.remoteOption === "onsite"
                                    ? "text-blue-600 dark:text-blue-400"
                                    : "text-gray-700 dark:text-gray-300"
                                }`}
                              >
                                On-site
                              </span>
                              <span className="text-xs text-gray-500">
                                In-office only
                              </span>
                            </div>
                          </label>
                          {/* Hybrid */}
                          <label
                            className={`flex items-center border rounded-lg p-3 cursor-pointer ${
                              jobData.remoteOption === "hybrid"
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                : "border-gray-200 dark:border-gray-700"
                            }`}
                          >
                            <input
                              type="radio"
                              name="remoteOption"
                              value="hybrid"
                              checked={jobData.remoteOption === "hybrid"}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <Home
                              size={20}
                              className={`mr-2 ${
                                jobData.remoteOption === "hybrid"
                                  ? "text-blue-600 dark:text-blue-400"
                                  : "text-gray-400"
                              }`}
                            />
                            <div>
                              <span
                                className={`block font-medium ${
                                  jobData.remoteOption === "hybrid"
                                    ? "text-blue-600 dark:text-blue-400"
                                    : "text-gray-700 dark:text-gray-300"
                                }`}
                              >
                                Hybrid
                              </span>
                              <span className="text-xs text-gray-500">
                                Mix of remote/office
                              </span>
                            </div>
                          </label>
                          {/* Remote */}
                          <label
                            className={`flex items-center border rounded-lg p-3 cursor-pointer ${
                              jobData.remoteOption === "remote"
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                : "border-gray-200 dark:border-gray-700"
                            }`}
                          >
                            <input
                              type="radio"
                              name="remoteOption"
                              value="remote"
                              checked={jobData.remoteOption === "remote"}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <Home
                              size={20}
                              className={`mr-2 ${
                                jobData.remoteOption === "remote"
                                  ? "text-blue-600 dark:text-blue-400"
                                  : "text-gray-400"
                              }`}
                            />
                            <div>
                              <span
                                className={`block font-medium ${
                                  jobData.remoteOption === "remote"
                                    ? "text-blue-600 dark:text-blue-400"
                                    : "text-gray-700 dark:text-gray-300"
                                }`}
                              >
                                Remote
                              </span>
                              <span className="text-xs text-gray-500">
                                Work from anywhere
                              </span>
                            </div>
                          </label>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Employment Type
                          </label>
                          <select
                            name="employmentType"
                            value={jobData.employmentType}
                            onChange={handleInputChange}
                            className="block w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                          >
                            <option value="full-time">Full-time</option>
                            <option value="part-time">Part-time</option>
                            <option value="contract">Contract</option>
                            <option value="internship">Internship</option>
                            <option value="temporary">Temporary</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Experience Level
                          </label>
                          <select
                            name="experienceLevel"
                            value={jobData.experienceLevel}
                            onChange={handleInputChange}
                            className="block w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                          >
                            <option value="entry">Entry Level</option>
                            <option value="mid">Mid Level</option>
                            <option value="senior">Senior Level</option>
                            <option value="executive">Executive Level</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Job Description */}
                {formStep === 2 && !previewMode && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                      Job Description &amp; Details
                    </h2>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="col-span-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Salary Min*
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <DollarSign size={18} className="text-gray-400" />
                            </div>
                            <input
                              type="number"
                              name="salaryMin"
                              value={jobData.salaryMin}
                              onChange={handleInputChange}
                              className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                              placeholder="e.g. 50000"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-span-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Salary Max
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <DollarSign size={18} className="text-gray-400" />
                            </div>
                            <input
                              type="number"
                              name="salaryMax"
                              value={jobData.salaryMax}
                              onChange={handleInputChange}
                              className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                              placeholder="e.g. 80000"
                            />
                          </div>
                        </div>
                        <div className="col-span-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Period
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <select
                              name="salaryCurrency"
                              value={jobData.salaryCurrency}
                              onChange={handleInputChange}
                              className="block w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                            >
                              <option value="USD">USD</option>
                              <option value="EUR">EUR</option>
                              <option value="GBP">GBP</option>
                              <option value="CAD">CAD</option>
                              <option value="AUD">AUD</option>
                              <option value="JPY">JPY</option>
                            </select>
                            <select
                              name="salaryPeriod"
                              value={jobData.salaryPeriod}
                              onChange={handleInputChange}
                              className="block w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                            >
                              <option value="year">Yearly</option>
                              <option value="month">Monthly</option>
                              <option value="hour">Hourly</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Job Description*
                        </label>
                        <textarea
                          name="description"
                          value={jobData.description}
                          onChange={handleInputChange}
                          className="block w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                          rows={6}
                          placeholder="Provide a detailed description of the role, responsibilities, and company information..."
                          required
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Requirements*
                        </label>
                        <textarea
                          name="requirements"
                          value={jobData.requirements}
                          onChange={handleInputChange}
                          className="block w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                          rows={4}
                          placeholder="List the qualifications, skills, and experience required for this role..."
                          required
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Benefits &amp; Perks
                        </label>
                        <textarea
                          name="benefits"
                          value={jobData.benefits}
                          onChange={handleInputChange}
                          className="block w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                          rows={4}
                          placeholder="Describe benefits, perks, and other advantages of working at your company..."
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Skills &amp; Tags
                        </label>
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-2">
                            {selectedTags.map((tag) => (
                              <div
                                key={tag}
                                className="flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
                              >
                                {tag}
                                <button
                                  type="button"
                                  onClick={() => removeTag(tag)}
                                  className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {popularTags
                              .filter((tag) => !selectedTags.includes(tag))
                              .map((tag) => (
                                <button
                                  key={tag}
                                  type="button"
                                  onClick={() => handleTagSelect(tag)}
                                  className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                >
                                  + {tag}
                                </button>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Application Details */}
                {formStep === 3 && !previewMode && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                      Application Details
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Application Deadline*
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar size={18} className="text-gray-400" />
                          </div>
                          <input
                            type="date"
                            name="applicationDeadline"
                            value={jobData.applicationDeadline}
                            onChange={handleInputChange}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                            required
                          />
                        </div>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
                        <div className="flex items-start">
                          <AlertTriangle
                            size={24}
                            className="text-blue-600 dark:text-blue-400 mr-3 mt-0.5"
                          />
                          <div>
                            <h3 className="font-medium text-blue-600 dark:text-blue-400 mb-1">
                              Application Method
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Provide at least one method for candidates to
                              apply. You can use either an email address, a
                              website URL, or both.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Application Email
                        </label>
                        <input
                          type="email"
                          name="applicationEmail"
                          value={jobData.applicationEmail}
                          onChange={handleInputChange}
                          className="block w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                          placeholder="e.g. careers@yourcompany.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Application URL
                        </label>
                        <input
                          type="url"
                          name="applicationUrl"
                          value={jobData.applicationUrl}
                          onChange={handleInputChange}
                          className="block w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                          placeholder="e.g. https://yourcompany.com/careers/apply"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Review & Submit */}
                {formStep === 4 && (
                  <div>
                    {previewMode ? (
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                          Preview Job Listing
                        </h2>
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                              {jobData.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                              {jobData.company} - {jobData.location}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                              Department:
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              {jobData.department}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                              Remote Options:
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              {jobData.remoteOption.charAt(0).toUpperCase() +
                                jobData.remoteOption.slice(1)}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                              Employment Type:
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              {jobData.employmentType}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                              Experience Level:
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              {jobData.experienceLevel}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                              Salary:
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              {jobData.salaryCurrency} {jobData.salaryMin}{" "}
                              {jobData.salaryMax && `- ${jobData.salaryMax}`} /{" "}
                              {jobData.salaryPeriod}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                              Job Description:
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              {jobData.description}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                              Requirements:
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              {jobData.requirements}
                            </p>
                          </div>
                          {jobData.benefits && (
                            <div>
                              <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                                Benefits:
                              </h4>
                              <p className="text-gray-600 dark:text-gray-400">
                                {jobData.benefits}
                              </p>
                            </div>
                          )}
                          <div>
                            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                              Application Deadline:
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              {jobData.applicationDeadline}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                              Application Email:
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              {jobData.applicationEmail}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                              Application URL:
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              {jobData.applicationUrl}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                              Skills &amp; Tags:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {jobData.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                          Review &amp; Submit
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Please review your job listing details before
                          submitting.
                        </p>
                      </div>
                    )}
                    <div className="flex justify-between mt-8">
                      <button
                        onClick={prevStep}
                        className="px-5 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                      >
                        Back
                      </button>
                      <button
                        onClick={submitJob}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        Submit Job
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Buttons for Steps 1-3 */}
            {!previewMode && formStep < 4 && (
              <div className="flex justify-between">
                {formStep > 1 && (
                  <button
                    onClick={prevStep}
                    className="px-5 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    Back
                  </button>
                )}
                {formStep < 4 && (
                  <button
                    onClick={nextStep}
                    className="ml-auto px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    disabled={
                      (formStep === 1 && !isStep1Valid) ||
                      (formStep === 2 && !isStep2Valid) ||
                      (formStep === 3 && !isStep3Valid)
                    }
                  >
                    Next
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
