"use client";
import { useState } from "react";

// Type definitions for candidate data
enum EmploymentStatus {
  ACTIVELY_LOOKING = "Actively Looking",
  OPEN_TO_OFFERS = "Open to Offers",
  EMPLOYED = "Currently Employed",
  NOT_AVAILABLE = "Not Available",
}

interface Education {
  institution: string;
  degree: string;
  field: string;
  years: string;
}

interface WorkExperience {
  company: string;
  position: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
}

interface Skill {
  name: string;
  level: number; // 1-5
}

interface CandidateDetails {
  id: string;
  fullName: string;
  title: string;
  profilePhoto: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
  skills: Skill[];
  workExperience: WorkExperience[];
  education: Education[];
  languages: { language: string; proficiency: string }[];
  linkedin: string | null;
  github: string | null;
  status: EmploymentStatus;
  desiredSalary: { min: number; max: number } | null;
  preferredWorkMode: string;
}

// Sample data for demonstration
const sampleCandidate: CandidateDetails = {
  id: "cand-12345",
  fullName: "Alex Morgan",
  title: "Senior Software Engineer",
  profilePhoto: "/api/placeholder/150/150",
  location: "Seattle, WA",
  email: "alex.morgan@example.com",
  phone: "+1 (555) 123-4567",
  summary:
    "Passionate software engineer with 8+ years of experience building scalable web applications. Specialized in frontend development with React and TypeScript.",
  skills: [
    { name: "React", level: 5 },
    { name: "TypeScript", level: 5 },
    { name: "JavaScript", level: 5 },
    { name: "Next.js", level: 4 },
    { name: "Node.js", level: 4 },
    { name: "GraphQL", level: 4 },
    { name: "CSS/SCSS", level: 4 },
    { name: "Redux", level: 4 },
    { name: "AWS", level: 3 },
    { name: "Docker", level: 3 },
  ],
  workExperience: [
    {
      company: "TechSolutions Inc.",
      position: "Senior Frontend Engineer",
      location: "Seattle, WA",
      period: "May 2021 - Present",
      description:
        "Leading a team of 5 frontend developers working on a large-scale SaaS platform.",
      achievements: [
        "Implemented a component library that reduced development time by 30%",
        "Led migration from JavaScript to TypeScript, reducing bugs by 25%",
        "Optimized rendering performance, improving page load times by 40%",
      ],
    },
    {
      company: "DataViz Corp",
      position: "Frontend Developer",
      location: "Portland, OR",
      period: "Mar 2018 - Apr 2021",
      description:
        "Developed data visualization dashboards for enterprise clients. Focused on interactive charts and responsive design.",
      achievements: [
        "Built real-time dashboards used by Fortune 500 companies",
        "Implemented custom D3.js visualizations that increased user engagement by 45%",
        "Reduced bundle size by 60% through code splitting and lazy loading",
      ],
    },
  ],
  education: [
    {
      institution: "University of Washington",
      degree: "Master of Science",
      field: "Computer Science",
      years: "2013 - 2015",
    },
    {
      institution: "California State University",
      degree: "Bachelor of Science",
      field: "Software Engineering",
      years: "2009 - 2013",
    },
  ],
  languages: [
    { language: "English", proficiency: "Native" },
    { language: "Spanish", proficiency: "Professional" },
  ],
  linkedin: "https://linkedin.com/in/alexmorgan",
  github: "https://github.com/alexmorgan",
  status: EmploymentStatus.OPEN_TO_OFFERS,
  desiredSalary: { min: 120000, max: 150000 },
  preferredWorkMode: "Hybrid",
};

// Skill Badge component for better visualization
const SkillBadge = ({ name, level }: { name: string; level: number }) => {
  const getColor = () => {
    if (level >= 5) return "bg-blue-100 text-blue-700";
    if (level >= 4) return "bg-green-100 text-green-700";
    if (level >= 3) return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className={`px-3 py-1 rounded-full ${getColor()} flex items-center`}>
      <span className="font-medium">{name}</span>
      <div className="ml-2 flex items-center">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-1 h-1 rounded-full mx-px ${
              i < level ? "bg-current" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default function CandidatePage() {
  const [candidate] = useState<CandidateDetails>(sampleCandidate);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main content area */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Candidate Profile Header */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-24"></div>
            <div className="px-6 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-end -mt-12 mb-4 gap-4">
                <img
                  src={candidate.profilePhoto}
                  alt={candidate.fullName}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-sm"
                />
                <div className="pt-2 sm:pb-2 flex-1">
                  <h1 className="text-2xl font-bold text-gray-800">
                    {candidate.fullName}
                  </h1>
                  <p className="text-gray-600">{candidate.title}</p>
                </div>
                <span
                  className={`self-start sm:self-center mt-2 sm:mt-0 px-3 py-1 rounded-full text-sm font-medium ${
                    candidate.status === EmploymentStatus.ACTIVELY_LOOKING
                      ? "bg-green-100 text-green-800"
                      : candidate.status === EmploymentStatus.OPEN_TO_OFFERS
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {candidate.status}
                </span>
              </div>

              <div className="flex flex-wrap items-center text-gray-600 gap-x-6 gap-y-2 mb-6">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{candidate.location}</span>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{candidate.email}</span>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{candidate.preferredWorkMode}</span>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    {candidate.desiredSalary
                      ? `$${(candidate.desiredSalary.min / 1000).toFixed(
                          0
                        )}k - $${(candidate.desiredSalary.max / 1000).toFixed(
                          0
                        )}k`
                      : "Not specified"}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 mb-6">
                {candidate.linkedin && (
                  <a
                    href={candidate.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors rounded-full p-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                )}
                {candidate.github && (
                  <a
                    href={candidate.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors rounded-full p-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                )}
              </div>

              <p className="text-gray-600">{candidate.summary}</p>
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill, index) => (
                <SkillBadge key={index} name={skill.name} level={skill.level} />
              ))}
            </div>

            {candidate.languages.length > 0 && (
              <div className="mt-6">
                <h3 className="text-md font-semibold text-gray-700 mb-3">
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {candidate.languages.map((lang, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {lang.language} ({lang.proficiency})
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Work Experience */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Work Experience
            </h2>
            <div className="space-y-6">
              {candidate.workExperience.map((exp, index) => (
                <div
                  key={index}
                  className="border-l-2 border-blue-500 pl-4 pb-6 last:pb-0"
                >
                  <div className="flex flex-col sm:flex-row justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {exp.position}
                    </h3>
                    <span className="text-sm text-gray-500">{exp.period}</span>
                  </div>
                  <div className="mb-3">
                    <span className="text- text-gray-600">{exp.company}</span>
                    <span className="text-gray-400 mx-2">•</span>
                    <span className="text-gray-600">{exp.location}</span>
                  </div>
                  <p className="text-gray-600 mb-2">{exp.description}</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Education</h2>
            <div className="space-y-4">
              {candidate.education.map((edu, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-gray-600">{edu.institution}</p>
                  </div>
                  <div className="text-sm text-gray-500">{edu.years}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Button */}
          <div className="text-center">
            <a
              href={`mailto:${candidate.email}`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-medium transition-colors"
            >
              Contact Candidate
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
