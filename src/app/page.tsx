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
import { JobDetails } from "@/model/domains/job.domain";
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

const App = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

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
      name: "Technology",
      icon: <Code size={24} />,
      color: "from-indigo-300 to-indigo-500",
    },
    {
      name: "Design",
      icon: <Pencil size={24} />,
      color: "from-cyan-300 to-cyan-500 ",
    },
    {
      name: "Marketing",
      icon: <TrendingUp size={24} />,
      color: "from-red-300 to-red-500",
    },
    {
      name: "Business",
      icon: <PieChart size={24} />,
      color: "from-yellow-300 to-yellow-500 ",
    },
    {
      name: "Sales",
      icon: <ShoppingBag size={24} />,
      color: "from-blue-300 to-blue-500",
    },
    {
      name: "Customer Service",
      icon: <Users size={24} />,
      color: "from-teal-300 to-teal-500 ",
    },
  ];

  const [featuredJobs, setFeaturedJobs] = useState<JobDetails[]>([]);

  useEffect(() => {
    async function loadJobs() {
      try {
        const res = await fetchJobs(0, 6); // Get the first page, size 6
        const jobs = Array.isArray(res?.contents) ? res.contents : [];

        const companiesRes = await fetchAllCompanies(0, 6);
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
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-blue-100">
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
            filter: "brightness(0.7)",
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
          <div className="max-w-6xl px-14 mx-auto  ">
            <div className=" p-6  rounded-2xl ">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 relative">
                  {/* Left Icon */}
                  <Box
                    className="absolute top-0 left-4 h-full flex items-center pointer-events-none text-gray-400"
                    size={24}
                  />
                  {/* Select Dropdown */}
                  <select
                    name="specialization"
                    id="specialization"
                    defaultValue=""
                    className="text-gray-600 block text-base w-full pl-12 pr-10 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  >
                    <option value="" className="" disabled hidden>
                      Specialization
                    </option>
                    <option value="IT">IT</option>
                    <option value="Engineer">Engineer</option>
                  </select>
                  {/* Custom Down Arrow */}
                  <div className="absolute top-0 right-4 h-full flex items-center pointer-events-none">
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div className="flex-1 relative">
                  <Search
                    className="absolute top-0 left-4 h-full flex items-center text-gray-400"
                    size={24}
                  />
                  <input
                    type="text"
                    placeholder="Job title or keyword"
                    className="w-full pl-12 text-base pr-4 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full pl-12 text-base pr-4 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <MapPin
                    className="absolute top-0 left-4 h-full flex items-center text-gray-400"
                    size={24}
                  />
                </div>
                <button className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg border-b-2 border-blue-700 hover:border-blue-500  text-gray-100 px-8 py-2 rounded-lg transition-colors text-lg font-medium">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 bg-gradient-to-t from-indigo-100 via-purple-100 to-blue-100  dark:from-gray-900 dark:to-gray-800  shadow-lg dark:bg-gray-900 ">
        <section className="relative pt-10 py-6  transition-colors">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex justify-between items-center mb-14">
              <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                🔥 Latest Jobs
              </h2>
              <button className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition">
                View All Jobs
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {featuredJobs.map((job) => (
                <div
                  key={job.id}
                  className="relative group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl p-6 hover:shadow-3xl transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-4 items-center">
                      <img
                        src={`http://localhost:8080${job.employer.profilePictureUrl}`}
                        alt={job.employer.companyName}
                        className="w-14 h-14 rounded-xl object-cover bg-white shadow"
                      />
                      <div>
                        <p className="text-base font-bold text-gray-800 dark:text-white">
                          {job.employer.companyName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {job.location}
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-700/20 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-semibold">
                      {job.jobType}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition">
                    {job.title}
                  </h3>

                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                    <Clock size={16} className="mr-2" />
                    Posted: {new Date(job.postedAt).toLocaleDateString()}
                  </div>

                  <div className="mb-5 flex flex-wrap gap-2">
                    {job.requirements.split(",").map((skill, index) => (
                      <span
                        key={index}
                        className="bg-indigo-50 dark:bg-indigo-700/20 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-sm pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <MapPin size={16} className="mr-2" />
                      {job.location}
                    </div>
                    <span className="font-bold text-indigo-700 dark:text-indigo-400">
                      MMK {job.salaryMin} - {job.salaryMax}
                    </span>
                  </div>

                  <div className="mt-6">
                    <Link
                      href={`/public-employer/${job.employer.id}/${job.id}`}
                    >
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 via-purple-600 to-blue-500 text-white font-semibold rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                        <span>Apply Now</span>
                        <svg
                          className="w-4 h-4 animate-bounce"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
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
                        <span className="italic">{company.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HiOutlinePhone className="text-green-500" />
                        <span className="font-medium">
                          {company.phoneNumber}
                        </span>
                      </div>
                    </div>

                    <a
                      href={`/employer/${company.id}`}
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

      {/* Call to Action */}
      <section className="py-20 from-indigo-300 to-indigo-500 bg-gradient-to-r">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who have found their dream jobs
            through our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Search Jobs
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Post a Job
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
