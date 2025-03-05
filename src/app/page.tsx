"use client";
import React, { useEffect, useState } from "react";
import myImage from "@/lib/modern-equipped-computer-lab.jpg";
import custom from "@/lib/long-shot-business-people-meeting.jpg";
import JobSlider from "@/components/layout/JobSlider";
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

  const featuredCompanies = [
    {
      id: 1,
      name: "TechCorp Inc.",
      logo: "/api/placeholder/80/80",
      positions: 12,
      industry: "Technology",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Design Studios",
      logo: "/api/placeholder/80/80",
      positions: 8,
      industry: "Design",
      rating: 4.8,
    },
    {
      id: 3,
      name: "Marketing Pro",
      logo: "/api/placeholder/80/80",
      positions: 5,
      industry: "Marketing",
      rating: 4.3,
    },
  ];

  const categories = [
    {
      name: "Technology",
      icon: <Code size={24} />,
      count: 234,
      color: "bg-blue-100 text-blue-600",
    },
    {
      name: "Design",
      icon: <Pencil size={24} />,
      count: 156,
      color: "bg-purple-100 text-purple-600",
    },
    {
      name: "Marketing",
      icon: <TrendingUp size={24} />,
      count: 98,
      color: "bg-green-100 text-green-600",
    },
    {
      name: "Business",
      icon: <PieChart size={24} />,
      count: 176,
      color: "bg-orange-100 text-orange-600",
    },
    {
      name: "Sales",
      icon: <ShoppingBag size={24} />,
      count: 145,
      color: "bg-red-100 text-red-600",
    },
    {
      name: "Customer Service",
      icon: <Users size={24} />,
      count: 89,
      color: "bg-teal-100 text-teal-600",
    },
  ];

  const featuredJobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "Yangon",
      type: "Full-time",
      salary: "300,00MMK - 500,000MMK",
      skills: ["React", "Node.js", "AWS"],
      posted: "2d ago",
      logo: "/api/placeholder/64/64",
      benefits: ["Health Insurance", "Remote Work", "401(k)"],
      featured: true,
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "Design Studios",
      location: "Remote",
      type: "Contract",
      salary: "300,00MMK - 500,000MMK",
      skills: ["Figma", "Adobe XD", "Sketch"],
      posted: "1d ago",
      logo: "/api/placeholder/64/64",
      benefits: ["Flexible Hours", "Project Bonus", "Equipment Allowance"],
      featured: true,
    },
    {
      id: 3,
      title: "Marketing Manager",
      company: "Growth Co.",
      location: "Mandalay",
      type: "Full-time",
      salary: "300,00MMK - 500,000MMK",
      skills: ["SEO", "Content Strategy", "Analytics"],
      posted: "3d ago",
      logo: "/api/placeholder/64/64",
      benefits: ["Healthcare", "Stock Options", "Gym Membership"],
      featured: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-300">
      {/* Navigation */}

      {/* Hero Section */}
      <div
        className="relative pb-48 flex content-center items-center justify-center"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="absolute top-0 w-full h-full bg-cover bg-center shadow-lg"
          style={{
            backgroundImage: `url(${custom.src})`,
            // backgroundImage:
            // "url('https://img.freepik.com/free-photo/businesspeople-meeting-office-working_23-2148908920.jpg?t=st=1739979759~exp=1739983359~hmac=d1f5585d4ecc593f88039cc882890c49e2b3f74b7dbc1c4463540900196edc0f&w=996')",
            // backgroundImage:
            //   "url('https://www.risefor-career.com/images/top/RISEforCarrer_A001_TOP.png')",
            filter: "brightness(0.7)",
          }}
        />

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

      {/* Stats Section */}
      <section className=" bg-white py-16  ">
        <div className="max-w-7xl mx-auto px-4 bg-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 rounded-sm ">
            <div className="text-center shadow-gray-150 shadow-lg  py-16 pb-20 ">
              <div className="text-4xl font-bold text-blue-600 mb-2">3M+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="text-center shadow-gray-150 shadow-lg py-16 pb-20 ">
              <div className="text-4xl font-bold text-blue-600 mb-2">150K+</div>
              <div className="text-gray-600">Jobs Posted</div>
            </div>
            <div className="text-center shadow-lg shadow-gray-150 py-16 pb-20 ">
              <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">Companies</div>
            </div>
            <div className="text-center py-16 pb-20  shadow-lg shadow-gray-150">
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Jobs</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              View All Jobs →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-12 h-12 rounded-lg"
                    />
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                      {job.type}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{job.company}</p>

                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin size={16} className="mr-2" />
                    {job.location}
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center text-gray-500">
                      <Clock size={16} className="mr-2" />
                      {job.posted}
                    </div>
                    <span className="font-semibold text-gray-900">
                      {job.salary}
                    </span>
                  </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 rounded-b-xl">
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Popular Categories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.name}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-500 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${category.color}`}>
                    {category.icon}
                  </div>
                  <span className="text-gray-500">{category.count} jobs</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Featured Companies
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCompanies.map((company) => (
              <div
                key={company.id}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-16 h-16 rounded-lg mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {company.name}
                    </h3>
                    <p className="text-gray-600">{company.industry}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-gray-500 mt-4 pt-4 border-t">
                  <span>{company.positions} open positions</span>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1">{company.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">
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
      <section className="py-20 bg-blue-600">
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
