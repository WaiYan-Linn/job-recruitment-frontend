"use client";

import {
  fetchEmployerProfile,
  updateEmployerProfile,
  uploadEmployerProfilePicture,
} from "@/model/clients/employer-client";
import { useAccessToken } from "@/model/stores/use-accessToken";
import { useEffect, useState } from "react";
import { ImageIcon, UploadIcon, SaveIcon } from "lucide-react";
import { UpdateEmployerRequest } from "@/model/domains/employer.domain";
import { useForm } from "react-hook-form";

export default function EmployerProfilePage() {
  const [profilePicture, setProfilePicture] = useState<null | string>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false); // New success state

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, isValid },
  } = useForm<UpdateEmployerRequest>({
    mode: "onChange",
  });

  const token = useAccessToken((s) => s.accessToken);

  const refreshProfile = async () => {
    try {
      const data = await fetchEmployerProfile();
      const url = data.profilePictureUrl?.trim();
      if (!url || url === "null" || url.includes("null")) {
        setProfilePicture(null);
      } else {
        setProfilePicture("http://localhost:8080" + data.profilePictureUrl);
      }

      reset({
        companyName: data.companyName,
        website: data.website,
        aboutUs: data.aboutUs,
        address: data.address,
        phoneNumber: data.phoneNumber,
      });
    } catch (err) {
      console.error("Failed to fetch employer profile:", err);
    } finally {
    }
  };

  useEffect(() => {
    if (token) {
      refreshProfile();
    }
  }, [token]);

  const onSubmit = async (data: UpdateEmployerRequest) => {
    try {
      await updateEmployerProfile(data);
      setSaveSuccess(true);

      // Clear success message after 2 seconds
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (err) {
      console.error("Failed to update profile:", err);
    } finally {
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoadingUpload(true);
    try {
      const imageUrl = await uploadEmployerProfilePicture(file);
      setProfilePicture(imageUrl);
      setFile(null);
    } catch (err) {
      console.error("Failed to upload profile picture:", err);
    } finally {
      setLoadingUpload(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-2 bg-white rounded-2xl shadow-lg p-8 space-y-6">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Company Profile
      </h1>

      {/* Profile Picture Upload Section */}
      <div className="flex flex-col items-center">
        {typeof profilePicture === "string" && profilePicture.trim() !== "" ? (
          <img
            src={profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full bg-contain ring-4 ring-blue-200 mb-3"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-3 text-gray-400">
            <ImageIcon className="w-10 h-10" />
          </div>
        )}

        <input
          type="file"
          onChange={handleFileChange}
          className="bg-blue-200 m-4 rounded-full p-2"
        />
        <button
          onClick={handleUpload}
          className="mt-2 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          disabled={loadingUpload}
        >
          <UploadIcon className="w-4 h-4" />
          {loadingUpload ? "Uploading..." : "Upload Picture"}
        </button>
      </div>

      {/* Form for Job Profile Fields */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Company Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Company Name
          </label>
          <input
            type="text"
            {...register("companyName")}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Website
          </label>
          <input
            type="text"
            {...register("website")}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            About Us
          </label>
          <textarea
            {...register("aboutUs")}
            className="w-full border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-y min-h-[120px]"
            placeholder="Tell us about your company..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            {...register("address")}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="text"
            {...register("phoneNumber")}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {saveSuccess && (
          <div className="bg-green-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative">
            Profile updated successfully!
          </div>
        )}

        <div className="text-right space-x-4 flex items-center justify-end">
          {isSubmitting && (
            <span className="text-gray-500 text-sm">Saving changes...</span>
          )}
          <button
            type="submit"
            className={`flex items-center gap-2 px-6 py-2 rounded transition
              ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 blue:bg-green-700 text-white"
              }
              ${!isDirty && "opacity-50 cursor-not-allowed"}`}
            disabled={isSubmitting || !isDirty || !isValid}
          >
            <SaveIcon className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
