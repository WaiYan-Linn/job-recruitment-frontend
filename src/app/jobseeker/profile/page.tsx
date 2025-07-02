"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchJobSeekerProfile } from "@/model/clients/jobseeker-client";
import {
  ApplicationSummary,
  JobSeekerDetails,
} from "@/model/domains/jobseeker.domain";
import { motion } from "framer-motion";
import { Progress } from "@radix-ui/react-progress";
import { Button } from "@/components/ui/button";
import { useAccessToken } from "@/model/stores/use-accessToken";

export default function JobseekerProfilePage() {
  const [profile, setProfile] = useState<JobSeekerDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const token = useAccessToken((s) => s.accessToken);

  useEffect(() => {
    if (token) {
      fetchJobSeekerProfile()
        .then((data) => setProfile(data))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-500">Failed to load profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-10">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl shadow-lg p-10 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-6">
          {profile?.profilePictureUrl ? (
            <img
              src={`http://localhost:8080` + profile.profilePictureUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full ring-4 ring-blue-200 mb-3"
            />
          ) : (
            <Avatar className="h-28 w-28 ring-4 ring-white">
              <AvatarImage
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  profile.personalName
                )}`}
              />
              <AvatarFallback>{profile.personalName.charAt(0)}</AvatarFallback>
            </Avatar>
          )}

          <div>
            <h1 className="text-4xl font-bold">{profile.personalName}</h1>
            <p className="text-md">@{profile.email}</p>
          </div>
        </div>
        <div className="mt-6 md:mt-0">
          <Badge className="text-white bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-2 text-sm font-medium rounded-full">
            {profile.skills.length} Skills Listed
          </Badge>
        </div>
      </div>

      {/* About Me */}
      <Card className="rounded-2xl shadow-sm border border-gray-200">
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-800">About Me</h2>
        </CardHeader>
        <CardContent>
          <p
            className="text-gray-700 leading-relaxed"
            style={{ whiteSpace: "pre-line" }}
          >
            {profile.profileSummary || "No summary provided."}
          </p>
        </CardContent>
      </Card>

      {/* Contact & Personal Details */}
      <Card className="rounded-2xl shadow-sm border border-gray-200">
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-800">
            Contact & Personal Details
          </h2>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div className="space-y-2">
            <div className="group transition-all">
              <p className="text-sm text-gray-500 group-hover:text-indigo-500">
                Email
              </p>
              <p className="text-lg font-medium">{profile.email}</p>
            </div>
            <div className="group transition-all">
              <p className="text-sm text-gray-500 group-hover:text-indigo-500">
                Phone
              </p>
              <p className="text-lg font-medium">{profile.phoneNumber}</p>
            </div>
            <div className="group transition-all">
              <p className="text-sm text-gray-500 group-hover:text-indigo-500">
                Address
              </p>
              <p className="text-lg font-medium">{profile.address}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="group transition-all">
              <p className="text-sm text-gray-500 group-hover:text-indigo-500">
                Username
              </p>
              <p className="text-lg font-medium">{profile.personalName}</p>
            </div>
            <div className="group transition-all">
              <p className="text-sm text-gray-500 group-hover:text-indigo-500">
                Date of Birth
              </p>
              <p className="text-lg font-medium">
                {profile.dateOfBirth
                  ? new Date(profile.dateOfBirth).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Section */}
      <Card className="rounded-2xl shadow-sm border border-gray-200">
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-800">Skills</h2>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          {profile.skills.length > 0 ? (
            profile.skills.map((skill: string) => (
              <Badge
                key={skill}
                className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide transition"
              >
                {skill}
              </Badge>
            ))
          ) : (
            <p className="text-gray-500">No skills listed.</p>
          )}
        </CardContent>
      </Card>

      {/* Applications Section */}
      <Card className="rounded-2xl shadow-sm border border-gray-200">
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-800">Applications</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          {profile.applications.map((app: ApplicationSummary) => (
            <div
              key={app.id}
              className="flex flex-col md:flex-row md:items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-200 hover:shadow-md transition"
            >
              <div className="space-y-1">
                <h3 className="text-lg font-medium text-gray-800">
                  {app.jobTitle}
                </h3>
                <p className="text-sm text-gray-600">{app.companyName}</p>
                <p className="text-xs text-gray-400">
                  Applied on {new Date(app.appliedDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <Badge
                  className={`mt-2 md:mt-0 px-4 py-1 rounded-full text-sm font-semibold 
                    ${
                      app.status === "Accepted"
                        ? "bg-green-100 text-green-800"
                        : app.status === "Rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                >
                  {app.status}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
