"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useForm, SubmitHandler } from "react-hook-form";

// Data type interfaces
interface Experience {
  id: number;
  title: string;
  company: string;
  logo: string;
  startDate: string;
  endDate: string;
  description: string;
  current?: boolean;
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  logo: string;
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

export interface Profile {
  name: string;
  email: string;
  phone: string;
  title: string;
  location: string;
  avatarUrl: string;
  bio: string;
  openToWork: boolean;
  salary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certificates: Certificate[];
}

// Props for EditProfileModal
interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
  onSave: (profile: Profile) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
}) => {
  const { register, handleSubmit, reset } = useForm<Profile>({
    defaultValues: profile,
  });

  // Reset the form when the profile changes
  useEffect(() => {
    reset(profile);
  }, [profile, reset]);

  const onSubmit: SubmitHandler<Profile> = (data) => {
    onSave(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Edit Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  {...register("title", { required: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  {...register("phone")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                {...register("location")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Professional Bio
              </label>
              <textarea
                {...register("bio")}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register("openToWork")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                id="openToWork"
              />
              <label
                htmlFor="openToWork"
                className="ml-2 block text-sm text-gray-700"
              >
                I am currently open to work
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expected Salary
              </label>
              <input
                type="text"
                {...register("salary")}
                placeholder="e.g. $100K - $130K"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Props for AddExperienceModal
interface AddExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (experience: Experience) => void;
}

const AddExperienceModal: React.FC<AddExperienceModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const { register, handleSubmit, watch, reset } = useForm<
    Omit<Experience, "id">
  >({
    defaultValues: {
      title: "",
      company: "",
      logo: "/api/placeholder/40/40",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    },
  });

  // Watch the current checkbox so we can disable the endDate field if checked.
  const current = watch("current", false);

  const onSubmit: SubmitHandler<Omit<Experience, "id">> = (data) => {
    onAdd({ ...data, id: Date.now() });
    onClose();
    reset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Add Work Experience</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                {...register("title", { required: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <input
                type="text"
                {...register("company", { required: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="text"
                  {...register("startDate", { required: true })}
                  placeholder="e.g. Jan 2022"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="text"
                  {...register("endDate", { required: !current })}
                  placeholder="e.g. Mar 2023 or Present"
                  disabled={current}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register("current")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                id="currentJob"
              />
              <label
                htmlFor="currentJob"
                className="ml-2 block text-sm text-gray-700"
              >
                I currently work here
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Description
              </label>
              <textarea
                {...register("description", { required: true })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>
          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Experience
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function EnhancedProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 123-4567",
    title: "Frontend Developer",
    location: "San Francisco, CA",
    avatarUrl: "/api/placeholder/120/120",
    bio: "Passionate frontend developer with 5+ years of experience building modern web applications. Specializing in the React ecosystem and performance optimization.",
    openToWork: true,
    salary: "$110K - $140K",
    experience: [
      {
        id: 1,
        title: "Senior Frontend Engineer",
        company: "TechVision",
        logo: "/api/placeholder/40/40",
        startDate: "Jan 2021",
        endDate: "Present",
        description:
          "Led development of a component library used across multiple products. Improved page load times by 40% through code splitting and optimization techniques.",
      },
      {
        id: 2,
        title: "Frontend Developer",
        company: "InnoSoft Solutions",
        logo: "/api/placeholder/40/40",
        startDate: "Mar 2018",
        endDate: "Dec 2020",
        description:
          "Developed responsive interfaces for enterprise clients using React and Redux. Collaborated with the UX team to implement design systems.",
      },
    ],
    education: [
      {
        id: 1,
        degree: "B.S. Computer Science",
        institution: "University of California",
        logo: "/api/placeholder/40/40",
        year: "2018",
      },
    ],
    skills: [
      { name: "React", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Next.js", level: 75 },
      { name: "CSS/SCSS", level: 85 },
      { name: "Redux", level: 70 },
      { name: "Git", level: 80 },
      { name: "UI/UX", level: 65 },
    ],
    projects: [
      {
        id: 1,
        title: "E-commerce Platform",
        description:
          "Built a full-featured online store with React, Next.js, and Stripe integration.",
        image: "/api/placeholder/300/150",
        url: "#",
      },
      {
        id: 2,
        title: "Portfolio Website",
        description:
          "Personal portfolio showcasing my work and skills with animations.",
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
  });

  const [activeTab, setActiveTab] = useState("about");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "application",
      message: "Your application was viewed by TechCorp",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "message",
      message: "You received a message from Sarah at Google",
      time: "1 day ago",
      read: true,
    },
  ]);

  const handleProfileUpdate = (updatedProfile: Profile) => {
    setProfile({ ...profile, ...updatedProfile });
    addNotification({
      type: "success",
      message: "Profile updated successfully",
      time: "Just now",
    });
  };

  const handleAddExperience = (newExperience: Experience) => {
    setProfile({
      ...profile,
      experience: [newExperience, ...profile.experience],
    });
    addNotification({
      type: "success",
      message: "Experience added successfully",
      time: "Just now",
    });
  };

  const addNotification = (notification: {
    type: string;
    message: string;
    time: string;
  }) => {
    const newNotification = {
      id: Date.now(),
      ...notification,
      read: false,
    };
    setNotifications([newNotification, ...notifications]);

    if (notification.type === "success") {
      setTimeout(() => {
        setNotifications((current) =>
          current.filter((n) => n.id !== newNotification.id)
        );
      }, 5000);
    }
  };

  return (
    <>
      <Head>
        <title>{profile.name} | Professional Profile</title>
        <meta
          name="description"
          content={`${profile.name} - ${profile.title}`}
        />
      </Head>

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2 w-80">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`rounded-lg shadow-md px-4 py-3 flex items-start transform transition-all duration-300 ${
              notification.type === "success"
                ? "bg-green-50 border-l-4 border-green-500"
                : notification.type === "application"
                ? "bg-blue-50 border-l-4 border-blue-500"
                : "bg-white border"
            }`}
          >
            <div className="flex-shrink-0 mr-3">
              {notification.type === "success" && (
                <svg
                  className="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {notification.type === "application" && (
                <svg
                  className="h-5 w-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {notification.type === "message" && (
                <svg
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
              )}
            </div>
            <div className="flex-grow">
              <p className="text-sm">{notification.message}</p>
              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
            </div>
            <button
              onClick={() =>
                setNotifications(
                  notifications.filter((n) => n.id !== notification.id)
                )
              }
              className="ml-auto flex-shrink-0 text-gray-400 hover:text-gray-500"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <main className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white">
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Profile Image */}
              <div className="relative">
                <div className="h-32 w-32 md:h-40 md:w-40 rounded-full bg-white p-1 shadow-xl">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="rounded-full h-full w-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 rounded-full p-2 shadow-lg text-white"
                    onClick={() => setShowEditModal(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Profile Intro */}
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold">
                    {profile.name}
                  </h1>
                  {profile.openToWork && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full uppercase tracking-wide">
                      Open to work
                    </span>
                  )}
                </div>
                <h2 className="text-xl md:text-2xl font-medium mb-2">
                  {profile.title}
                </h2>
                <div className="flex items-center justify-center md:justify-start gap-2 text-blue-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{profile.location}</span>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
                  <button className="bg-white text-blue-800 hover:bg-blue-50 font-medium px-4 py-2 rounded-lg shadow-md">
                    Download Resume
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow-md">
                    Contact Me
                  </button>
                </div>
              </div>

              <div className="hidden md:flex ml-auto flex-col items-end">
                <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-sm mb-1">Expected salary</div>
                  <div className="text-xl font-bold">{profile.salary}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="sticky top-0 z-10 bg-white shadow">
          <div className="container mx-auto px-4">
            <nav className="flex overflow-x-auto">
              {[
                "about",
                "experience",
                "skills",
                "education",
                "projects",
                "certificates",
              ].map((tab) => (
                <button
                  key={tab}
                  className={`px-5 py-4 font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                {activeTab === "about" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">About Me</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {profile.bio}
                    </p>
                    <h3 className="text-lg font-semibold mb-3">
                      Contact Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm text-gray-500">Email</div>
                          <div className="font-medium">{profile.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm text-gray-500">Phone</div>
                          <div className="font-medium">{profile.phone}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "experience" && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">Work Experience</h2>
                      <button
                        onClick={() => setShowExperienceModal(true)}
                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2-1v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Add Experience
                      </button>
                    </div>
                    <div className="space-y-4">
                      {profile.experience.map((exp) => (
                        <div key={exp.id} className="border p-4 rounded-md">
                          <h3 className="text-xl font-semibold">{exp.title}</h3>
                          <p className="text-gray-600">
                            {exp.company} • {exp.startDate} - {exp.endDate}
                          </p>
                          <p className="mt-2 text-gray-700">
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === "skills" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Skills</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {profile.skills.map((skill) => (
                        <div key={skill.name} className="p-4 border rounded-md">
                          <h3 className="font-medium">{skill.name}</h3>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === "education" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Education</h2>
                    {profile.education.map((edu) => (
                      <div key={edu.id} className="border p-4 rounded-md mb-4">
                        <h3 className="text-xl font-semibold">{edu.degree}</h3>
                        <p className="text-gray-600">
                          {edu.institution} • {edu.year}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === "projects" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {profile.projects.map((project) => (
                        <a
                          key={project.id}
                          href={project.url}
                          className="block border rounded-md overflow-hidden hover:shadow-lg transition-shadow"
                        >
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full"
                          />
                          <div className="p-4">
                            <h3 className="text-xl font-semibold">
                              {project.title}
                            </h3>
                            <p className="mt-2 text-gray-700">
                              {project.description}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === "certificates" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Certificates</h2>
                    {profile.certificates.map((cert) => (
                      <div key={cert.id} className="border p-4 rounded-md mb-4">
                        <h3 className="text-xl font-semibold">{cert.name}</h3>
                        <p className="text-gray-600">
                          {cert.issuer} • {cert.date}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>{/* Sidebar or additional content if needed */}</div>
            </div>
          </div>
        </div>
      </main>

      <EditProfileModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        profile={profile}
        onSave={handleProfileUpdate}
      />
      <AddExperienceModal
        isOpen={showExperienceModal}
        onClose={() => setShowExperienceModal(false)}
        onAdd={handleAddExperience}
      />
    </>
  );
}
