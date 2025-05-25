"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  Users,
  FilePlus,
  Calendar,
  MessageSquare,
  Settings,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = [
    { href: "/employer", icon: Home, label: "Dashboard" },
    { href: "/employer/candidates", icon: Users, label: "Candidates" },
    { href: "/employer/job-listing", icon: FilePlus, label: "Job Listings" },
    { href: "/schedule", icon: Calendar, label: "Schedule" },
    { href: "/messages", icon: MessageSquare, label: "Messages" },
    { href: "/employer/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <>
      {/* Desktop */}
      <nav className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-white dark:bg-gray-900 border-r dark:border-gray-700">
        <div className="flex items-center justify-center h-16" />
        <div className="flex-1 flex flex-col overflow-y-auto">
          <ul className="px-2 py-4 space-y-1">
            {navItems.map(({ href, icon: Icon, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 border-t dark:border-gray-700">
          <div className="flex items-center">
            <span className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 inline-block" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Jane Doe
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                HR Manager
              </p>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile */}
      <div className="md:hidden">
        {!mobileOpen && (
          <button
            onClick={() => setMobileOpen(true)}
            className="fixed top-4 left-4 z-30 p-1 ml-0 mr-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-gray-900 dark:text-gray-100 z-20" />
          </button>
        )}
        {mobileOpen && (
          <div className="fixed inset-0 z-20 flex">
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={() => setMobileOpen(false)}
            />
            <nav className="relative flex flex-col w-64 bg-white dark:bg-gray-900">
              <div className="flex items-center justify-between h-16 px-4 border-b dark:border-gray-700">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X className="h-6 w-6 text-gray-900 dark:text-gray-100" />
                </button>
              </div>
              <ul className="px-2 py-4 space-y-1">
                {navItems.map(({ href, icon: Icon, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="p-4 border-t dark:border-gray-700">
                <div className="flex items-center">
                  <span className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 inline-block" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Jane Doe
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      HR Manager
                    </p>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </>
  );
}
