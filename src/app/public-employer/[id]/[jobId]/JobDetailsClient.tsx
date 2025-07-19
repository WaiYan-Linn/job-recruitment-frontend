"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  HiOutlineLocationMarker,
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineMail,
  HiOutlineClipboardList,
  HiOutlineCheckCircle,
  HiOutlineChevronLeft,
} from "react-icons/hi";
import { useAccessToken } from "@/model/stores/use-accessToken";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  applyToJob,
  checkApplication,
} from "@/model/clients/application-client";
import { set } from "react-hook-form";

// Type for the part of your JWT payload that has `role`
interface TokenPayload {
  rol: string;
}

type Job = Awaited<
  ReturnType<typeof import("@/model/clients/job-client").fetchJobsById>
>;

// A minimal Modal stub—you can swap for your real one
function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose(): void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 relative p-6">
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default function JobDetailsClient({ job }: { job: Job }) {
  const token = useAccessToken((s) => s.accessToken);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [overDeadline, setOverDeadline] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Decode role directly from token
  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    if (!token) {
      setRole(null);
      return;
    }
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      setRole(decoded.rol);
      const checkStatus = async () => {
        if (decoded.rol === "ROLE_JOBSEEKER") {
          const applied = await checkApplication(job.id); // Pass the correct jobId
          setHasApplied(applied);
        }
      };
      setOverDeadline(new Date(job.deadline) < new Date());

      checkStatus();
    } catch {
      setRole(null);
    }
  }, [token, hasApplied, overDeadline]);

  // UI state

  const handleApplyClick = () => {
    if (!token) {
      return setShowLoginModal(true);
    }
    if (role !== "ROLE_JOBSEEKER") {
      console.log(role);
      return toast.error("Only job-seekers can apply.");
    }
    setShowUploadModal(true);
  };

  const submitApplication = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      return toast.error("Please select your resume file.");
    }
    const formData = new FormData();
    formData.append("resumeFile", file);

    setUploading(true);
    try {
      const message = await applyToJob(job.id, file);
      toast.success(message); // "Application submitted successfully"
      setHasApplied(true);
      setShowUploadModal(false);
    } catch (err: any) {
      toast.error("Failed to apply: " + (err.response?.data || err.message));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen dark:bg-gradient-to-r dark:from-gray-900 via-white dark:to-gray-800 shadow-lg">
      {/* Back Link */}
      <nav className="max-w-4xl mx-auto px-6 py-4">
        <Link
          href="/public-employer"
          className="inline-flex items-center text-gray-700 hover:text-indigo-600"
        >
          <HiOutlineChevronLeft className="mr-2 text-xl" />
          <span className="font-medium">Back to Job Listings</span>
        </Link>
      </nav>

      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-300 via-white/50 to-blue-500 shadow-md rounded-b-3xl">
        <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <img
            src={`http://localhost:8080${job.employer.profilePictureUrl}`}
            alt={job.employer.companyName}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-indigo-500"
          />
          <div className="md:col-span-2 space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
            <p className="text-lg text-gray-600">{job.employer.companyName}</p>
            <div className="flex flex-wrap gap-3 mt-2">
              <Badge icon={<HiOutlineLocationMarker />} text={job.location} />
              <Badge icon={<HiOutlineBriefcase />} text={job.jobType} />
              <Badge icon={<HiOutlineCalendar />} text={job.workMode} />
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto py-12 grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Sidebar */}
        <aside className="space-y-6 lg:col-span-2">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Job Details
            </h2>
            <ul className="space-y-3 text-gray-700">
              <DetailItem label="Category" value={job.category} />
              <DetailItem label="Experience" value={job.experience} />
              <DetailItem
                label="Salary"
                value={`MMK ${job.salaryMin.toLocaleString()} – ${job.salaryMax.toLocaleString()}`}
              />
              <DetailItem
                label="Deadline"
                value={new Date(job.deadline).toLocaleDateString()}
              />
              <li className="flex items-center gap-2">
                <HiOutlineMail className="text-indigo-500 text-lg" />
                <Link
                  href={`mailto:${job.applicationEmail}`}
                  className="text-indigo-600 underline"
                >
                  {job.applicationEmail}
                </Link>
              </li>
            </ul>
          </div>
          <div className="sticky top-20">
            <button
              onClick={handleApplyClick}
              disabled={hasApplied || overDeadline || job.closed}
              className={`block w-full text-center font-semibold py-3 rounded-xl shadow ${
                hasApplied || overDeadline || job.closed
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {hasApplied
                ? "Applied"
                : job.closed
                ? "Closed"
                : overDeadline
                ? "Deadline Passed"
                : "Apply Now"}
            </button>
          </div>
        </aside>

        {/* Content */}
        <section className="lg:col-span-3 space-y-10">
          <ContentBlock
            title="Description"
            icon={<HiOutlineClipboardList />}
            content={job.description}
          />
          <ContentBlock
            title="Requirements"
            icon={<HiOutlineCheckCircle />}
            content={job.requirements}
          />
          <ContentBlock
            title="Benefits"
            icon={<HiOutlineCheckCircle />}
            content={job.benefits}
          />
        </section>
      </main>

      {/* Login Modal */}
      {showLoginModal && (
        <Modal onClose={() => setShowLoginModal(false)}>
          <h2 className="text-xl mb-4">Please Log In</h2>
          <button
            onClick={() => router.push("/anonymous/signin")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Go to Login
          </button>
        </Modal>
      )}

      {/* Upload CV Modal */}
      {showUploadModal && (
        <Modal onClose={() => setShowUploadModal(false)}>
          <h2 className="text-xl mb-4">Upload Your CV</h2>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            ref={fileInputRef}
            className="mb-4"
          />
          <button
            onClick={submitApplication}
            disabled={uploading}
            className={`px-4 py-2 rounded ${
              uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {uploading ? "Submitting…" : "Submit Application"}
          </button>
        </Modal>
      )}
    </div>
  );
}

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="flex items-center gap-1 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
      {icon}
      <span>{text}</span>
    </span>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-center gap-2">
      <span className="font-medium text-gray-800 w-28">{label}:</span>
      <span>{value}</span>
    </li>
  );
}

function ContentBlock({
  title,
  icon,
  content,
}: {
  title: string;
  icon: React.ReactNode;
  content: string;
}) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow">
      <h3 className="flex items-center gap-3 text-2xl font-semibold text-gray-800 mb-4">
        {icon}
        <span>{title}</span>
      </h3>
      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
        {content}
      </p>
    </div>
  );
}
