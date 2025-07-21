"use client";
import React, { useEffect, useState } from "react";
import myImage from "@/lib/modern-equipped-computer-lab.jpg";
import custom from "@/lib/vecteezy_young-burmese-businessmen-meet-and-talk-about-their-business_7541872.jpg";
import JobSlider from "@/components/layout/JobSlider";
import { motion } from "framer-motion";
import Link from "next/link";

import { useAuthentication } from "@/model/stores/authentication-store";
import {
  Search,
  Briefcase,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ChevronDownIcon,
  User,
  LogOut,
  Heart,
  TrendingUp,
  DollarSign,
  Globe,
  Clock,
  Building,
  Users,
  Code,
  Pencil,
  PieChart,
  ShoppingBag,
  Box,
  Underline,
} from "lucide-react";
import { JobDetails, JobDetailsWithStatus } from "@/model/domains/job.domain";
import { fetchJobs } from "@/model/clients/job-client";
import { EmployerProfile } from "@/model/domains/employer.domain";
import {
  HiOutlinePhone,
  HiOutlineGlobeAlt,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import {
  fetchAllCompanies,
  fetchEmployerProfile,
} from "@/model/clients/employer-client";
import { set } from "react-hook-form";
import { useRouter } from "next/navigation";
import JobCard from "@/components/layout/JobCard";
import { useAccessToken } from "@/model/stores/use-accessToken";

const App = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const router = useRouter();

  const [specialization, setSpecialization] = useState("");
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const query = new URLSearchParams();
    if (specialization) query.append("specialization", specialization);
    if (keyword) query.append("keyword", keyword);
    if (location) query.append("location", location);

    router.push(`/jobs?${query.toString()}`);
  };

  const isTokenValid = (token: string | null) => {
    if (!token) return false;

    try {
      // Check if the token is a JSON string containing the JWT
      let jwtToken = token;
      if (token.trim().startsWith("{")) {
        const tokenObj = JSON.parse(token);
        jwtToken = tokenObj.state?.authentication?.accessToken;
        if (!jwtToken) {
          console.log("JWT not found in token object");
          return false;
        }
      }

      // Decode the JWT payload
      const base64Url = jwtToken.split(".")[1];
      if (!base64Url) {
        console.error("Token format is incorrect");
        return false;
      }
      const payload = JSON.parse(atob(base64Url));
      return payload.exp * 1000 > Date.now(); // Compare expiration time with current time
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  };

  const [featuredCompanies, setFeaturedCompanies] = useState<EmployerProfile[]>(
    []
  );

  const categories = [
    {
      name: "IT",
      icon: <Code size={24} />,
      color: "from-indigo-300 to-indigo-500",
    },
    {
      name: "Engineering",
      icon: <Pencil size={24} />,
      color: "from-cyan-300 to-cyan-500 ",
    },
    {
      name: "Marketing",
      icon: <TrendingUp size={24} />,
      color: "from-red-300 to-red-500",
    },
    {
      name: "Sales",
      icon: <PieChart size={24} />,
      color: "from-yellow-300 to-yellow-500 ",
    },
    {
      name: "Banking",
      icon: <ShoppingBag size={24} />,
      color: "from-blue-300 to-blue-500",
    },
    {
      name: "Design",
      icon: <Users size={24} />,
      color: "from-teal-300 to-teal-500 ",
    },

    {
      name: "Others",
      icon: <Users size={24} />,
      color: "from-purple-300 to-purple-500 ",
    },
  ];

  const [featuredJobs, setFeaturedJobs] = useState<JobDetailsWithStatus[]>([]);
  const token = useAccessToken((s) => s.accessToken);

  useEffect(() => {
    async function loadJobs() {
      try {
        const res = await fetchJobs(0, 6); // Get the first page, size 6
        const jobs = Array.isArray(res?.contents) ? res.contents : [];

        const companiesRes = await fetchAllCompanies(0, 10);
        const companies = Array.isArray(companiesRes?.contents)
          ? companiesRes.contents
          : [];

        setFeaturedCompanies(companies);
        setFeaturedJobs(jobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setFeaturedJobs([]);
        setFeaturedCompanies([]);
        // fallback to empty array
      }
    }

    loadJobs();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-600 to-blue-100">
      {/* Navigation */}

      {/* Hero Section */}
      <div
        className="relative pb-48 flex content-center items-center justify-center"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="absolute top-0 w-full h-full shadow-lg"
          style={{
            backgroundImage: `url(${custom.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.8)",
          }}
        ></div>

        <div className="absolute bottom-10 mx-auto px-16 w-full max-w-6xl overflow-visible">
          <div className="job-slider-wrapper relative">
            <div className="w-full mt-8">
              <JobSlider />
            </div>
            {/* Custom Pagination Container */}
            <div id="custom-pagination" className=""></div>
          </div>
        </div>

        {/* Search Box */}

        <div className="absolute top-24 left-0 right-0 mb-12">
          <form onSubmit={handleSubmit}>
            <div className="max-w-6xl px-14 mx-auto">
              <div className="p-6 rounded-2xl">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Specialization Dropdown */}
                  <div className="flex-1 relative">
                    <Box
                      className="absolute top-0 left-4 h-full flex items-center pointer-events-none text-gray-400"
                      size={24}
                    />
                    <select
                      name="specialization"
                      id="specialization"
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      className="text-gray-600 block text-base w-full pl-12 pr-10 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    >
                      <option value="" disabled hidden>
                        Specialization
                      </option>
                      {categories.map((category) => (
                        <option key={category.name} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute top-0 right-4 h-full flex items-center pointer-events-none">
                      <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Keyword Input */}
                  <div className="flex-1 relative">
                    <Search
                      className="absolute top-0 left-4 h-full flex items-center text-gray-400"
                      size={24}
                    />
                    <input
                      type="text"
                      placeholder="Job title or keyword"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      className="w-full pl-12 text-base pr-4 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Location Input */}
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-12 text-base pr-4 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <MapPin
                      className="absolute top-0 left-4 h-full flex items-center text-gray-400"
                      size={24}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-700 shadow-lg border-b-2 border-blue-700 hover:border-blue-500 text-gray-100 px-8 py-2 rounded-lg transition-colors text-lg font-medium"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="p-8 bg-gradient-to-t from-indigo-100 via-purple-100 to-blue-100  dark:from-gray-900 dark:to-gray-800  shadow-lg dark:bg-gray-900 ">
        <section className="relative pt-10 py-6  transition-colors">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex justify-between items-center mb-14">
              <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                🔥 Latest Jobs
              </h2>
              <form onSubmit={handleSubmit}>
                <button className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition">
                  View All Jobs
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {featuredJobs.map(({ jobDetails, hasApplied, overDeadline }) => (
                <JobCard
                  key={jobDetails.id}
                  jobDetails={jobDetails}
                  hasApplied={hasApplied}
                  overDeadline={overDeadline}
                />
              ))}
            </div>
          </div>

          {/* Decorative blurred shapes */}
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-400 opacity-20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-400 opacity-20 blur-3xl rounded-full"></div>
        </section>
      </div>

      <section className="pt-20 py-10 bg-gradient-to-t from-indigo-100 via-white to-blue-100  dark:from-gray-900 dark:to-gray-800 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-12 text-center">
            Popular Categories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <motion.div
                key={category.name}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group bg-white dark:bg-gray-700 rounded-2xl border border-transparent hover:border-blue-400 shadow-md hover:shadow-xl overflow-hidden cursor-pointer transition-all"
              >
                <div
                  className={`h-32 flex items-center justify-center bg-gradient-to-br ${category.color} group-hover:opacity-90 transition-opacity`}
                >
                  <div className="text-4xl text-gray-700">{category.icon}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {/* Optional: put a short description here */}
                    Explore {category.name.toLowerCase()} opportunities
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-20 py-10 bg-gradient-to-r from-indigo-200 via-white to-blue-200  shadow-lg dark:from-gray-900 dark:to-gray-800 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            🌟 Featured Companies
          </h2>

          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16  dark:from-gray-900 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16  dark:from-gray-900 to-transparent" />

            <div
              className="flex space-x-6 overflow-x-auto scroll-pl-6 snap-x snap-mandatory pb-4"
              style={{ scrollbarWidth: "none" }}
            >
              {featuredCompanies.map((company) => (
                <div
                  key={company.id}
                  className="snap-center flex-shrink-0 w-64 md:w-72 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  {/* Header bar */}
                  <div className="h-16 rounded-t-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                    <img
                      src={`http://localhost:8080${company.profilePictureUrl}`}
                      alt={company.companyName}
                      className="w-12 h-12 rounded-full ring-2 ring-white"
                    />
                  </div>

                  <div className="p-4">
                    {/* Gradient Title + Text Shadow */}
                    <h3 className="text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500 mb-1 drop-shadow-sm">
                      {company.companyName}
                    </h3>

                    {/* Gradient underline link */}
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500 hover:underline mb-3 block"
                    >
                      {company.website.replace(/^https?:\/\//, "")}
                    </a>

                    <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 mb-4 leading-snug">
                      {company.aboutUs}
                    </p>

                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <HiOutlineLocationMarker className="text-indigo-500" />
                        <span className="italic line-clamp-2">
                          {company.address}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HiOutlinePhone className="text-green-500" />
                        <span className="font-medium">
                          {company.phoneNumber}
                        </span>
                      </div>
                    </div>

                    <a
                      href={`/public-employer/${company.id}`}
                      className="block text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-full px-4 py-2 font-semibold transition-colors duration-300"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-t from-indigo-200 via-white to-blue-100   ">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-16 text-center">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Create Account</h3>
              <p className="text-gray-600">
                Sign up and complete your profile with your skills and
                experience
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Find Jobs</h3>
              <p className="text-gray-600">
                Search and apply for jobs that match your skills and interests
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Get Hired</h3>
              <p className="text-gray-600">
                Interview with companies and land your dream job
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
