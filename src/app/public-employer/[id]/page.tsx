"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  HiOutlinePhone,
  HiOutlineGlobeAlt,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import {
  fetchCompany,
  fetchJobsByCompany,
} from "@/model/clients/public-client";
import type { EmployerProfile } from "@/model/domains/employer.domain";
import type { JobListing } from "@/model/domains/job.domain";

export default function EmployerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [employer, setEmployer] = useState<EmployerProfile | null>(null);
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { id: employerId } = useParams(); // employerId is a string

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    Promise.all([fetchCompany(id), fetchJobsByCompany(id, 0, 10)])
      .then(([emp, jobRes]) => {
        if (!isMounted) return;
        setEmployer(emp);
        setJobs(Array.isArray(jobRes.contents) ? jobRes.contents : []);
      })
      .catch(() => isMounted && setError(true))
      .finally(() => isMounted && setLoading(false));
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-teal-500 text-2xl">
        Loading...
      </div>
    );
  }

  if (error || !employer) {
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        Failed to load profile.
      </div>
    );
  }
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-indigo-300  to-blue-600 text-white py-20 px-6 shadow-md">
        <div className="max-w-6xl mx-auto p-4 flex flex-col md:flex-row items-center gap-10">
          <img
            src={`http://localhost:8080${employer.profilePictureUrl}`}
            alt={employer.companyName}
            className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-2xl transition-transform hover:scale-105"
          />
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
              {employer.companyName}
            </h1>
            <p className="mt-3 flex items-center gap-2 text-lg font-medium opacity-90">
              <HiOutlineLocationMarker className="text-white text-xl" />
              <span>{employer.address}</span>
            </p>
            {employer.website && (
              <a
                href={employer.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 bg-white text-indigo-600 font-semibold rounded-full hover:bg-indigo-100 transition shadow-sm"
              >
                <HiOutlineGlobeAlt className="text-lg" />
                <span className="underline underline-offset-4 decoration-indigo-400 hover:decoration-indigo-600 transition">
                  Visit Website
                </span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-20 space-y-24">
        {/* About */}
        <section>
          <h2 className="text-3xl font-bold mb-6 relative inline-block after:block after:h-[3px] after:w-full after:bg-gradient-to-r after:from-indigo-400 after:to-purple-500 after:mt-1">
            About Us
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-line">
            {employer.aboutUs}
          </p>
        </section>

        {/* Contact */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ContactCard
            icon={<HiOutlinePhone className="text-indigo-500 text-xl" />}
            label={
              <span className="underline underline-offset-4 decoration-indigo-400 font-semibold">
                Phone
              </span>
            }
            value={employer.phoneNumber}
          />
          <ContactCard
            icon={
              <HiOutlineLocationMarker className="text-indigo-500 text-xl" />
            }
            label={
              <span className="underline underline-offset-4 decoration-indigo-400 font-semibold">
                Address
              </span>
            }
            value={employer.address}
          />
        </section>

        {/* Jobs */}
        <section>
          <h2 className="text-3xl font-bold mb-6 relative inline-block after:block after:h-[3px] after:w-full after:bg-gradient-to-r after:from-purple-500 after:to-indigo-400 after:mt-1">
            Jobs Posted
          </h2>
          {jobs.length === 0 ? (
            <p className="text-slate-500 italic">No jobs posted yet.</p>
          ) : (
            <div className="grid md:grid-cols lg:grid-cols-2 gap-8">
              {jobs.map((job: any) => (
                <Link
                  key={job.id}
                  href={`/public-employer/${employerId}/${job.id}`}
                  className="p-6 bg-white hover:bg-slate-50 shadow-md hover:shadow-xl rounded-2xl border border-slate-200 cursor-pointer transition duration-200 group block"
                >
                  <h3 className="text-xl font-semibold text-slate-800 group-hover:text-indigo-600 transition">
                    {job.title}
                  </h3>
                  <p className="text-slate-600 mt-1">
                    📍 {job.location} | {job.jobType} | {job.workMode}
                  </p>
                  <p className="text-sm text-slate-400 mt-2">
                    <span className="text-slate-500">Posted on:</span>{" "}
                    {new Date(job.postedAt).toLocaleDateString()}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function ContactCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: React.ReactNode;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition">
      <div className="text-3xl text-blue-500">{icon}</div>
      <div>
        <h4 className="text-sm font-semibold text-gray-500 uppercase">
          {label}
        </h4>
        <p className="text-lg text-gray-800">{value}</p>
      </div>
    </div>
  );
}
