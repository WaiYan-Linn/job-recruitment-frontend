"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ImageIcon, UploadIcon, SaveIcon } from "lucide-react";
import { updateJobSeekerProfile } from "@/model/clients/jobseeker-client";
import { JobSeekerUpdateForm } from "@/model/domains/jobseeker.domain";
import { useAccessToken } from "@/model/stores/use-accessToken";
import {
  fetchJobSeekerProfile,
  uploadJobSeekerProfilePicture,
} from "@/model/clients/jobseeker-client";

export default function JobSeekerProfilePage() {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const token = useAccessToken((s) => s.accessToken);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, isValid },
  } = useForm<JobSeekerUpdateForm>({
    mode: "onChange",
    defaultValues: {
      personalName: "",
      profileSummary: "",
      profilePictureUrl: null,
      dateOfBirth: null,
      skills: [],
      phoneNumber: "",
      address: "",
    },
  });

  const refreshProfile = async () => {
    try {
      const data = await fetchJobSeekerProfile();
      const url = data.profilePictureUrl?.trim();
      if (!url || url === "null" || url.includes("null")) {
        setProfilePicture(null);
      } else {
        setProfilePicture("http://localhost:8080" + data.profilePictureUrl);
      }

      reset({
        personalName: data.personalName,
        profileSummary: data.profileSummary,
        profilePictureUrl: data.profilePictureUrl,
        dateOfBirth: data.dateOfBirth,
        skills: data.skills,
        phoneNumber: data.phoneNumber,
        address: data.address,
      });
    } catch (err) {
      console.error("Failed to fetch job seeker profile:", err);
    }
  };

  useEffect(() => {
    if (token) refreshProfile();
  }, [token]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoadingUpload(true);
    try {
      const imageUrl = await uploadJobSeekerProfilePicture(file);
      setProfilePicture(imageUrl);
      setFile(null);
    } catch (err) {
      console.error("Failed to upload profile picture:", err);
    } finally {
      setLoadingUpload(false);
    }
  };

  const onSubmit = async (form: JobSeekerUpdateForm) => {
    try {
      await updateJobSeekerProfile(form);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (err) {
      console.error("Failed to update job seeker profile:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-4 bg-white rounded-2xl shadow-lg p-8 space-y-6">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Job Seeker Profile
      </h1>

      {/* Profile Picture Upload */}
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

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            {...register("personalName")}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Profile Summary
          </label>
          <textarea
            {...register("profileSummary")}
            className="w-full border border-gray-300 rounded-md p-3 resize-y min-h-[100px]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            {...register("dateOfBirth")}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Skills (comma-separated)
          </label>
          <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                value={field.value.join(", ")}
                onChange={(e) =>
                  field.onChange(e.target.value.split(",").map((s) => s.trim()))
                }
                className="w-full border border-gray-300 rounded-md p-2"
              />
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="text"
            {...register("phoneNumber")}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            {...register("address")}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {saveSuccess && (
          <div className="bg-green-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative">
            Profile updated successfully!
          </div>
        )}

        <div className="text-right flex items-center justify-end gap-4">
          {isSubmitting && (
            <span className="text-gray-500 text-sm">Saving...</span>
          )}
          <button
            type="submit"
            className={`flex items-center gap-2 px-6 py-2 rounded transition
              ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
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
