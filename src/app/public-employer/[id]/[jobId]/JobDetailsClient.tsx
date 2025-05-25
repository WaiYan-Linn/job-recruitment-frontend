// app/public-employer/[id]/[jobId]/JobDetailsClient.tsx
"use client";

import Link from "next/link";
import {
  HiOutlineLocationMarker,
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineCurrencyDollar,
  HiOutlineMail,
  HiOutlineClipboardList,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import { motion } from "framer-motion";

type Job = Awaited<
  ReturnType<typeof import("@/model/clients/job-client").fetchJobsById>
>;

export default function JobDetailsClient({ job }: { job: Job }) {
  const fadeIn = { opacity: [0, 1], y: [10, 0] };
  const commonProps = { transition: { duration: 0.25 } };

  return (
    <>
      {/* Hero */}
      <header className="relative bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500 text-white py-16 px-6 md:px-12 rounded-b-3xl shadow-lg mb-12">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <img
            src={`http://localhost:8080${job.employer.profilePictureUrl}`}
            alt={job.employer.companyName}
            className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-2xl"
          />
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-extrabold leading-tight">
              {job.title}
            </h1>
            <p className="mt-2 text-xl opacity-90">
              {job.employer.companyName}
            </p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
              {[
                { label: job.location, Icon: HiOutlineLocationMarker },
                { label: job.jobType, Icon: HiOutlineBriefcase },
                { label: job.workMode, Icon: HiOutlineCalendar },
              ].map(({ label, Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1 bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium"
                >
                  <Icon /> {label}
                </span>
              ))}
            </div>
          </div>
        </div>
        <Link
          href={`mailto:${job.applicationEmail}`}
          className="absolute right-7 bottom-3 bg-white text-indigo-700 font-semibold px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transition"
        >
          Apply Now
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-12">
        {/* Job Details */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: fadeIn, visible: { opacity: 1, y: 0 } }}
          transition={commonProps.transition}
          className="bg-white rounded-2xl shadow-md p-8"
        >
          <h2 className="text-2xl font-semibold mb-4 border-b-2 border-indigo-300 pb-1">
            Job Details
          </h2>
          <ul className="space-y-2 text-slate-700">
            <li>
              <strong>Category:</strong> {job.category}
            </li>
            <li>
              <strong>Experience:</strong> {job.experience}
            </li>
            <li>
              <strong>Salary:</strong> MMK {job.salaryMin.toLocaleString()} –{" "}
              {job.salaryMax.toLocaleString()}
            </li>
            <li>
              <strong>Deadline:</strong>{" "}
              {new Date(job.deadline).toLocaleDateString()}
            </li>
            <li>
              <strong>Apply by Email:</strong>{" "}
              <a
                href={`mailto:${job.applicationEmail}`}
                className="text-indigo-600 underline"
              >
                <HiOutlineMail className="inline mr-1" />
                {job.applicationEmail}
              </a>
            </li>
          </ul>
        </motion.section>

        {/* Rich Text Sections */}
        {[
          {
            title: "Description",
            Icon: HiOutlineClipboardList,
            content: job.description,
          },
          {
            title: "Requirements",
            Icon: HiOutlineCheckCircle,
            content: job.requirements,
          },
          {
            title: "Benefits",
            Icon: HiOutlineCheckCircle,
            content: job.benefits,
          },
        ].map(({ title, Icon, content }, i) => (
          <motion.section
            key={title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: i * 0.1 }}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
              <Icon className="text-indigo-500" /> {title}
            </h3>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">
              {content}
            </p>
          </motion.section>
        ))}
      </main>

      {/* Sticky Apply CTA */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-8 py-4 rounded-full shadow-2xl hover:scale-105 transition">
        <Link href={`mailto:${job.applicationEmail}`} className="font-semibold">
          📧 Apply Now
        </Link>
      </div>
    </>
  );
}
