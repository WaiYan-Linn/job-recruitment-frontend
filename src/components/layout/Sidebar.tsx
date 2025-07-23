"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Plus, Users, FilePlus, Settings, Inbox } from "lucide-react";

// Helper to parse role from cookie
function getUserRoleFromCookie(): string | null {
  if (typeof document === "undefined") return null;

  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("job.recruit="))
    ?.split("=")[1];

  if (!cookieValue) return null;

  try {
    const parsed = JSON.parse(decodeURIComponent(cookieValue));
    return parsed?.state?.authentication?.role || null;
  } catch (err) {
    console.error("Failed to parse role from cookie", err);
    return null;
  }
}

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const pathname = usePathname();

  // Load role from cookie
  useEffect(() => {
    const r = getUserRoleFromCookie();
    setRole(r);
  }, []);

  const navItems = [
    {
      href: "/employer/job-posting",
      icon: Plus,
      label: "Post a job",
      roles: ["EMPLOYER"],
    },
    {
      href: "/employer/candidates",
      icon: Users,
      label: "Candidates",
      roles: ["EMPLOYER"],
    },
    {
      href: "/employer/job-listing",
      icon: FilePlus,
      label: "Job Listings",
      roles: ["EMPLOYER"],
    },
    {
      href: "/employer/settings",
      icon: Settings,
      label: "Settings",
      roles: ["EMPLOYER"],
    },
    {
      href: "/jobseeker/profile",
      icon: Users,
      label: "Profile",
      roles: ["JOBSEEKER"],
    },
    {
      href: "/jobseeker/application",
      icon: Inbox,
      label: "Applications",
      roles: ["JOBSEEKER"],
    },
    {
      href: "/jobseeker/settings",
      icon: Settings,
      label: "Settings",
      roles: ["JOBSEEKER"],
    },
  ];

  const filteredItems = navItems.filter((item) =>
    item.roles.includes(role || "")
  );

  return (
    <>
      {/* Desktop */}
      <nav className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-white dark:bg-gray-900 border-r dark:border-gray-700">
        <div className="flex items-center justify-center h-16" />
        <div className="flex-1 flex flex-col overflow-y-auto">
          <ul className="px-2 py-4 space-y-1">
            {filteredItems.map(({ href, icon: Icon, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 ${
                    pathname.startsWith(href)
                      ? "bg-gray-100 dark:bg-gray-800 font-semibold"
                      : ""
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
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
                {filteredItems.map(({ href, icon: Icon, label }) => (
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
            </nav>
          </div>
        )}
      </div>
    </>
  );
}
