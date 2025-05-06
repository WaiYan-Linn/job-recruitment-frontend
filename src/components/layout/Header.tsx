"use client"; // Only for Next.js App Router

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Briefcase,
  Building,
  LogIn,
  UserPlus,
  LogOut,
  Sun,
  Moon,
  Facebook,
  Instagram,
  Mail,
} from "lucide-react";
import { useAuth } from "@/model/providers/AuthContext";

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { authentication, signOut } = useAuth();
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Instead of directly signing up, show the register modal.
  const handleRegister = () => {
    setShowRegisterModal(true);
  };
  const { theme, setTheme } = useTheme();

  if (!theme) return null; // wait until theme is loaded
  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSignIn = () => router.push("/anonymous/signup");
  const isAuthPage =
    pathname === "/anonymous/signup" ||
    pathname === "/anonymous/signin" ||
    pathname === "/anonymous/signup/otp-verification";

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-20 transition">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Left - Logo & Navigation */}
          <div className="flex items-center space-x-8 ml-4">
            <Link href="/" className="flex items-center space-x-2">
              <Briefcase className="hidden md:block h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold  text-gray-900 dark:text-gray-200">
                CareerHub
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-6">
              <Link
                href="/jobs"
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                <Briefcase size={18} />
                <span>Find Jobs</span>
              </Link>
              <Link
                href="/companies"
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                <Building size={18} />
                <span>Companies</span>
              </Link>
            </div>
          </div>

          {/* Right - Social Media, User Actions & Dark Mode */}
          <div className="flex items-center space-x-4">
            {/* User Authentication Actions */}
            {authentication ? (
              <button
                onClick={signOut}
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                <LogOut size={24} />
                <span>Log Out</span>
              </button>
            ) : (
              !isAuthPage && (
                <>
                  <button
                    onClick={handleRegister}
                    className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    <UserPlus size={24} />
                    <span>Register</span>
                  </button>
                  <button
                    onClick={() => router.push("/anonymous/signin")}
                    className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    <LogIn size={24} />
                    <span>Login</span>
                  </button>
                </>
              )
            )}

            {!authentication && (
              <div className="flex space-x-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-700 transition"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="mailto:contact@careerhub.com"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  <Mail size={24} />
                </a>
              </div>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={() => toggleDarkMode()}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {theme === "dark" ? (
                // Sun icon for light mode
                <Sun className="text-gray-800" size={24} />
              ) : (
                // Moon icon for dark mode
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-moon text-gray-700"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modal Dialog for Registration Type */}
      {showRegisterModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Register As
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Please select your registration type:
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setShowRegisterModal(false);
                  router.push("/anonymous/signup?role=JOBSEEKER");
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Job Seeker
              </button>
              <button
                onClick={() => {
                  setShowRegisterModal(false);
                  router.push("/anonymous/signup?role=EMPLOYER");
                }}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Employer
              </button>
            </div>
            <button
              onClick={() => setShowRegisterModal(false)}
              className="mt-4 text-gray-600 dark:text-gray-300 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
