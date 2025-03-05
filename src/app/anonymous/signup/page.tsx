"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { accountRegister } from "../../../model/clients/signup-client"; // Adjust the path accordingly
import { SignUpForm } from "@/model/domains/anonymous.domain";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleFromQuery =
    (searchParams.get("role") as "JOBSEEKER" | "EMPLOYER") || "JOBSEEKER";

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    defaultValues: {
      role: roleFromQuery,
      name: "",
      phone: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpForm) => {
    setLoading(true);
    try {
      if (data.role === "EMPLOYER") {
        const employerData = { ...data, companyName: data.name }; // Add companyName from name
        delete employerData.name; // Remove the 'name' property from the form data
        await accountRegister(employerData);
        sessionStorage.setItem("signupData", JSON.stringify(employerData));
      } else {
        await accountRegister(data);
        sessionStorage.setItem("signupData", JSON.stringify(data));
      }

      router.push("/anonymous/signup/otp-verification");
    } catch (error) {
      console.error("Signup failed:", error);
      sessionStorage.removeItem("signupData");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900">
      <div className="bg-white mt-20 dark:bg-gray-700 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
          Create Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Render either "Full Name" or "Company Name" based on role */}
          {roleFromQuery === "JOBSEEKER" ? (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Full Name"
                {...register("name", { required: "Full Name is required" })}
                className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 
                           bg-gray-50 dark:bg-gray-600 text-gray-800 dark:text-gray-100 
                           focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>
          ) : (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Company Name"
                {...register("name", { required: "Company Name is required" })}
                className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 
                           bg-gray-50 dark:bg-gray-600 text-gray-800 dark:text-gray-100 
                           focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>
          )}

          <div className="mb-4">
            <input
              type="tel"
              placeholder="Phone Number"
              {...register("phone", { required: "Phone number is required" })}
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 
                         bg-gray-50 dark:bg-gray-600 text-gray-800 dark:text-gray-100 
                         focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            {errors.phone && (
              <span className="text-red-500">{errors.phone.message}</span>
            )}
          </div>

          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 
                         bg-gray-50 dark:bg-gray-600 text-gray-800 dark:text-gray-100 
                         focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 
                         bg-gray-50 dark:bg-gray-600 text-gray-800 dark:text-gray-100 
                         focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md font-semibold transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <a href="/anonymous/signin" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
