"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import type {
  JobRequest,
  JobType,
  WorkMode,
  Experience,
} from "@/model/domains/job.domain"; // adjust path
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
import custom from "@/lib/vecteezy_two-young-professionals-both-caucasian-shaking-hands-in-a_27183776.jpg";
import { createJob } from "@/model/clients/job-client";

export default function PostJobPage() {
  const [formStep, setFormStep] = useState(1);
  const [previewMode, setPreviewMode] = useState(false);

  const { register, control, handleSubmit, watch, getValues } =
    useForm<JobRequest>({
      defaultValues: {
        title: "",
        category: "IT",
        location: "",
        jobType: "FULL_TIME",
        workMode: "HYBRID",
        experience: "Entry",
        salaryMin: 0,
        salaryMax: 0,
        description: "",
        requirements: "",
        benefits: "",
        applicationEmail: "",
      },
    });

  const onSubmit = async (data: JobRequest) => {
    await createJob(data);
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
    console.log("Submitting job data:");
  };

  // Basic validation for each step
  const isStep1Valid = watch("title") && watch("location") && watch("category");
  const isStep2Valid =
    watch("salaryMin") && watch("description") && watch("requirements");
  const isStep3Valid = watch("deadline") && watch("applicationEmail");

  return (
    <div className="w-full min-h-screen pb-16  bg-gray-50 dark:bg-gray-800 flex flex-col md:flex-row overflow-hidden">
      <div className=" mx-auto ">
        <>
          <div className="mb-4 text-center">
            <h1 className="relative inline-block text-4xl font-extrabold dark:text-gray-900 text-gray-900  bg-gradient-to-r  from-zinc-800 via-blue-800 to-gray-800  text-transparent bg-clip-text mb-2">
              Post a New Job
            </h1>
            <p className="text-lg italic md:block hidden text-gray-900  bg-gradient-to-r  from-black via-blue-950 to-gray-800  text-transparent bg-clip-text  ">
              Create your job listing to attract top talent and find the perfect
              candidate.
            </p>
          </div>

          {/* Form Progress */}
          <div className="mb-8 md:block hidden">
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
          <form onSubmit={handleSubmit(onSubmit)}>
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
                              {...register("title")}
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
                            {...register("category")}
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
                            {...register("location")}
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
                              watch("workMode") === "ON_SITE"
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                : "border-gray-200 dark:border-gray-700"
                            }`}
                          >
                            <input
                              type="radio"
                              value="ON_SITE"
                              {...register("workMode")}
                              className="sr-only"
                            />
                            <Home
                              size={20}
                              className={`mr-2 ${
                                watch("workMode") === "ON_SITE"
                                  ? "text-blue-600 dark:text-blue-400"
                                  : "text-gray-400"
                              }`}
                            />
                            <div>
                              <span
                                className={`block font-medium ${
                                  watch("workMode") === "ON_SITE"
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
                              watch("workMode") === "HYBRID"
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                : "border-gray-200 dark:border-gray-700"
                            }`}
                          >
                            <input
                              type="radio"
                              value="HYBRID"
                              {...register("workMode")}
                              className="sr-only"
                            />
                            <Home
                              size={20}
                              className={`mr-2 ${
                                watch("workMode") === "HYBRID"
                                  ? "text-blue-600 dark:text-blue-400"
                                  : "text-gray-400"
                              }`}
                            />
                            <div>
                              <span
                                className={`block font-medium ${
                                  watch("workMode") === "HYBRID"
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
                              watch("workMode") === "REMOTE"
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                : "border-gray-200 dark:border-gray-700"
                            }`}
                          >
                            <input
                              type="radio"
                              {...register("workMode")}
                              value="REMOTE"
                              className="sr-only"
                            />
                            <Home
                              size={20}
                              className={`mr-2 ${
                                watch("workMode") === "REMOTE"
                                  ? "text-blue-600 dark:text-blue-400"
                                  : "text-gray-400"
                              }`}
                            />
                            <div>
                              <span
                                className={`block font-medium ${
                                  watch("workMode") === "REMOTE"
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
                            {...register("jobType")}
                            className="block w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                          >
                            <option value="FULL_TIME">Full-time</option>
                            <option value="PART_TIME">Part-time</option>
                            <option value="INTERNSHIP">Internship</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Experience Level
                          </label>
                          <select
                            {...register("experience")}
                            className="block w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                          >
                            <option value="Entry">Entry Level</option>
                            <option value="Mid">Mid Level</option>
                            <option value="Senior">Senior Level</option>
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
                              <div className="text-gray-400"> MMK</div>
                            </div>
                            <input
                              {...register("salaryMin")}
                              className="block w-full pl-14 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
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
                              <div className="text-gray-400"> MMK</div>
                            </div>
                            <input
                              {...register("salaryMax")}
                              className="block w-full pl-14 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                              placeholder="e.g. 80000"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Job Description*
                        </label>
                        <textarea
                          {...register("description")}
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
                          {...register("requirements")}
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
                          {...register("benefits")}
                          className="block w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                          rows={4}
                          placeholder="Describe benefits, perks, and other advantages of working at your company..."
                        ></textarea>
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
                            {...register("deadline")}
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
                          {...register("applicationEmail")}
                          className="block w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                          placeholder="e.g. careers@yourcompany.com"
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
                              {getValues("title")}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                              {getValues("location")}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                              Category:
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              {getValues("category")}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                              Remote Options:
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              {getValues("workMode")}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                              Employment Type:
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              {getValues("jobType")}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                              Experience Level:
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              {getValues("experience")}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                              Salary:
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              {getValues("salaryMin")} {getValues("salaryMax")}/{" "}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                              Job Description:
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              {getValues("description")}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                              Requirements:
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              {getValues("requirements")}{" "}
                            </p>
                          </div>
                          {getValues("benefits") && (
                            <div>
                              <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                                Benefits:
                              </h4>
                              <p className="text-gray-600 dark:text-gray-400">
                                {getValues("benefits")}
                              </p>
                            </div>
                          )}
                          <div>
                            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                              Application Deadline:
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              {getValues("deadline")}{" "}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                              Application Email:
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              {getValues("applicationEmail")}{" "}
                            </p>
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
                        type="submit"
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        Post Job
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>

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
      </div>
    </div>
  );
}
