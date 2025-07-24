"use client";
import React, { useEffect, useState } from "react";
import { fetchAllCompanies } from "@/model/clients/employer-client";
import { useRouter } from "next/navigation";

interface CompanyDetails {
  id: string;
  companyName: string;
  website: string;
  profilePictureUrl: string;
  aboutUs: string;
  address: string;
  phoneNumber: string;
}

const CompaniesPage = () => {
  const [companies, setCompanies] = useState<CompanyDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchName, setSearchName] = useState("");
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Send name to backend for filtering
      const name = searchName.trim();
      const res = await fetchAllCompanies(name, 0, 50);
      const contents = Array.isArray(res?.contents) ? res.contents : [];
      setCompanies(contents);
    } catch (err) {
      setError("Failed to fetch companies.");
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function loadCompanies() {
      try {
        setLoading(true);
        const res = await fetchAllCompanies("", 0, 50);
        const contents = Array.isArray(res?.contents) ? res.contents : [];
        setCompanies(contents);
      } catch (err) {
        setError("Failed to fetch companies.");
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    }
    loadCompanies();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-blue-100 p-8">
      <h2 className="text-4xl mt-12 font-bold text-center text-gray-900 dark:text-white mb-12">
        🌟 Companies
      </h2>
      <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-10">
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Search by company name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base shadow-sm bg-white dark:bg-gray-800 dark:text-white"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-indigo-700 transition"
          >
            Search
          </button>
          <button
            type="button"
            className="px-4 py-3 rounded-lg font-semibold border border-gray-300 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            onClick={async () => {
              setSearchName("");
              setLoading(true);
              setError(null);
              try {
                const res = await fetchAllCompanies("", 0, 50);
                const contents = Array.isArray(res?.contents)
                  ? res.contents
                  : [];
                setCompanies(contents);
              } catch (err) {
                setError("Failed to fetch companies.");
                setCompanies([]);
              } finally {
                setLoading(false);
              }
            }}
          >
            Clear Filters
          </button>
        </div>
      </form>
      {loading ? (
        <div className="text-center text-lg text-gray-600">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : companies.length === 0 ? (
        <div className="text-center text-gray-500">No companies found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {companies.map((company) => (
            <div
              key={company.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col hover:scale-[1.02] transition-transform duration-200"
            >
              <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <img
                  src={`http://localhost:8080${company.profilePictureUrl}`}
                  alt={company.companyName}
                  className="w-16 h-16 rounded-full ring-2 ring-white shadow-lg"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {company.companyName}
                </h3>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-600 hover:underline mb-2"
                >
                  {company.website.replace(/^https?:\/\//, "")}
                </a>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2 line-clamp-3">
                  {company.aboutUs}
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span className="block italic">{company.address}</span>
                  <span className="block font-medium">
                    {company.phoneNumber}
                  </span>
                </div>
                <a
                  href={`/public-employer/${company.id}`}
                  className="block text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-full px-4 py-2 font-semibold mt-auto transition-colors duration-300 shadow"
                >
                  View Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompaniesPage;
