"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SignInForm } from "@/model/domains/anonymous.domain";
import { useAuthentication } from "@/model/stores/authentication-store";
import { generateToken } from "@/model/clients/token-client";

export default function SigninPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>();
  const [loading, setLoading] = useState(false);
  const { setAuthentication } = useAuthentication();

  const signIn = async (form: SignInForm) => {
    setLoading(true);
    const result = await generateToken(form);
    setAuthentication(result);
    if (result.role === "JobSeeker") {
      router.push("/jobseeker");
    } else if (result.role === "Employer") {
      router.push("/employer");
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br  from-gray-200 via-indigo-500 to-blue-400">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          {/* Replace with your logo */}
          <img
            className="mx-auto h-12 w-auto"
            src="/logo.svg"
            alt="Your Logo"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            Welcome Back!
          </h2>
          <p className="mt-2 text-sm text-white">Sign in to your account</p>
        </div>
        <form
          onSubmit={handleSubmit(signIn)}
          className="bg-white py-8 px-6 shadow rounded-lg space-y-6"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                placeholder="you@example.com"
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 4,
                    message: "Password must be at least 4 characters",
                  },
                  maxLength: {
                    value: 8,
                    message: "Password must be at most 8 characters",
                  },
                })}
                placeholder="••••••••"
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Logging in..." : "Sign in"}
            </button>
          </div>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
