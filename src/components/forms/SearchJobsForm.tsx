// components/SearchJobsForm.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, ChevronDownIcon, MapPin, Search } from "lucide-react";

const categories = [
  { name: "IT" },
  { name: "Engineering" },
  { name: "Banking" },
  { name: "Marketing" },
  { name: "Design" },
  { name: "Sales" },
  { name: "Others" },
];

export default function SearchJobsForm() {
  const router = useRouter();
  const params = useSearchParams();

  const [keyword, setKeyword] = useState(params.get("keyword") || "");
  const [location, setLocation] = useState(params.get("location") || "");
  const [specialization, setSpecialization] = useState(
    params.get("specialization") || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const query = new URLSearchParams();

    if (keyword) query.set("keyword", keyword);
    if (location) query.set("location", location);
    if (specialization) query.set("specialization", specialization);

    router.push(`/jobs?${query.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-800 text-transparent bg-clip-text animate-fade-in mb-10 tracking-tight">
        🚀 Find Your Dream Job Today!
      </h1>

      <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-t from-indigo-300 rounded-3xl to-blue-200 shadow-2xl ">
        <div className="bg-white/30 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-8 ring-1 ring-gray-100/30 transition-all duration-300">
          <div className="flex flex-col md:flex-row gap-6 md:gap-4 items-end">
            {/* Specialization */}
            <div className="flex-1 relative">
              <label
                htmlFor="specialization"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Specialization
              </label>
              <div className="relative">
                <select
                  id="specialization"
                  name="specialization"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="block w-full px-4 py-3 pr-10 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                >
                  <option value="" disabled hidden>
                    Select a role
                  </option>
                  {categories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={20}
                />
              </div>
            </div>

            {/* Keyword */}
            <div className="flex-1 relative">
              <label
                htmlFor="keyword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Keyword
              </label>
              <div className="relative">
                <input
                  id="keyword"
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="e.g. React Developer"
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
                <Search
                  className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>
            </div>

            {/* Location */}
            <div className="flex-1 relative">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Location
              </label>
              <div className="relative">
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Yangon"
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
                <MapPin
                  className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
              >
                🔍 Search
              </button>
              <button
                type="button"
                onClick={() => {
                  setKeyword("");
                  setLocation("");
                  setSpecialization("");
                  router.push("/jobs");
                }}
                className="text-gray-500 hover:text-gray-700 text-sm px-2 bg-indigo-200 rounded-lg"
              >
                Clear filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
