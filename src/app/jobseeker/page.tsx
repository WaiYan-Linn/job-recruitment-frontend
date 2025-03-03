"use client";
import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import myImg from "../../lib/profilejpg.jpg";

// --- Type Definitions ---
interface Experience {
  id: number;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  year: string;
}

interface Skill {
  name: string;
  level: number;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
}

interface Certificate {
  id: number;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

interface Profile {
  name: string;
  title: string;
  location: string;
  bio: string;
  avatarUrl: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certificates: Certificate[];
}

export default function JobseekerPage() {
  // Dummy profile data
  const profile: Profile = {
    name: "Yee Wai Yan",
    title: "Full-Stack Developer",
    location: "Yangon, Myanmar",
    bio: "Passionate developer with 5+ years of experience building modern, responsive web applications. Skilled in React, Next.js, and performance optimization.",
    avatarUrl: "/api/placeholder/120/120",
    experience: [
      {
        id: 1,
        title: "Senior Frontend Engineer",
        company: "TechVision",
        startDate: "Jan 2021",
        endDate: "Present",
        description:
          "Led the development of scalable UI components and optimized performance.",
      },
      {
        id: 2,
        title: "Frontend Developer",
        company: "InnoSoft",
        startDate: "Mar 2018",
        endDate: "Dec 2020",
        description:
          "Built responsive web interfaces and collaborated with cross-functional teams.",
      },
    ],
    education: [
      {
        id: 1,
        degree: "B.S. in Computer Science",
        institution: "University of Yangon",
        year: "2018",
      },
    ],
    skills: [
      { name: "React", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Next.js", level: 75 },
      { name: "CSS/SCSS", level: 85 },
    ],
    projects: [
      {
        id: 1,
        title: "E-commerce Platform",
        description:
          "A robust e-commerce platform built with Next.js and Stripe integration.",
        image: "/api/placeholder/300/150",
        url: "#",
      },
      {
        id: 2,
        title: "Portfolio Website",
        description:
          "A personal portfolio showcasing modern animations and responsive design.",
        image: "/api/placeholder/300/150",
        url: "#",
      },
    ],
    certificates: [
      {
        id: 1,
        name: "React Advanced Concepts",
        issuer: "Frontend Masters",
        date: "May 2023",
        url: "#",
      },
      {
        id: 2,
        name: "Web Performance Optimization",
        issuer: "Google",
        date: "January 2022",
        url: "#",
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{profile.name} | Jobseeker Profile</title>
        <meta
          name="description"
          content={`${profile.name} - ${profile.title}`}
        />
      </Head>

      <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-16 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="container mx-auto flex flex-col items-center"
          >
            <img
              src={myImg.src}
              alt={profile.name}
              className="h-32 w-32 rounded-full border-4 border-white shadow-lg"
            />
            <h1 className="mt-4 text-4xl font-bold">{profile.name}</h1>
            <p className="text-2xl">{profile.title}</p>
            <div className="flex items-center justify-center mt-2 text-lg">
              <FaMapMarkerAlt className="mr-2" />
              <span>{profile.location}</span>
            </div>
          </motion.div>
        </section>

        {/* Sticky Navigation */}
        <nav className="bg-white dark:bg-gray-800 shadow sticky top-0 z-30">
          <div className="container mx-auto flex justify-center space-x-8 px-4 py-4">
            {[
              { id: "about", label: "About" },
              { id: "experience", label: "Experience" },
              { id: "skills", label: "Skills" },
              { id: "education", label: "Education" },
              { id: "projects", label: "Projects" },
              { id: "certificates", label: "Certificates" },
            ].map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-lg font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                {section.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <section className="container mx-auto px-20 py-12 space-y-12">
          {/* About Section */}
          <motion.div
            id="about"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4">About Me</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {profile.bio}
            </p>
          </motion.div>

          {/* Experience Section */}
          <motion.div
            id="experience"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">Experience</h2>
            <div className="space-y-6">
              {profile.experience.map((exp) => (
                <div
                  key={exp.id}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
                >
                  <h3 className="text-2xl font-semibold">{exp.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {exp.company} | {exp.startDate} - {exp.endDate}
                  </p>
                  <p className="mt-3 text-gray-700 dark:text-gray-300">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            id="skills"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">Skills</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {profile.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
                >
                  <h4 className="text-xl font-medium mb-2">{skill.name}</h4>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education Section */}
          <motion.div
            id="education"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">Education</h2>
            <div className="space-y-6">
              {profile.education.map((edu) => (
                <div
                  key={edu.id}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
                >
                  <h3 className="text-2xl font-semibold">{edu.degree}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {edu.institution} • {edu.year}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Projects Section */}
          <motion.div
            id="projects"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.projects.map((project) => (
                <motion.a
                  key={project.id}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transform transition duration-300 hover:shadow-2xl"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold">{project.title}</h3>
                    <p className="mt-3 text-gray-700 dark:text-gray-300">
                      {project.description}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Certificates Section */}
          <motion.div
            id="certificates"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">Certificates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
                >
                  <h3 className="text-2xl font-semibold">{cert.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {cert.issuer} • {cert.date}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}
