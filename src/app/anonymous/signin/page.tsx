"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SignInForm } from "@/model/domains/anonymous.domain";
import { useAuthentication } from "@/model/stores/authentication-store";
import { generateToken } from "@/model/clients/token-client";
import { useAccessToken } from "@/model/stores/use-accessToken";
import { client } from "@/model/utils"; // wherever you create the axios instance

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

    // Update access token in memory
    const token = result.accessToken;
    useAccessToken.getState().setAccessToken(token);
    console.log("Access token set in memory:", result.accessToken);
    client.defaults.headers.common["Authorization"] = result.accessToken; // <-- manually set it immediately

    // Prepare data for cookie storage
    const { accessToken, ...cookieData } = result;

    // Update authentication details in cookies
    const { setAuthentication } = useAuthentication.getState();
    setAuthentication(cookieData);
    if (result.role === "JOBSEEKER") {
      router.push("/jobseeker/profile");
    } else if (result.role === "EMPLOYER") {
      router.push("/employer/job-listing");
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center dark:from-gray-800 dark:to-gray-900 bg-gradient-to-br  from-gray-200 via-indigo-500 to-blue-400  ">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-16 text-3xl font-extrabold text-white">
            Welcome Back!
          </h2>
          <p className="mt-2 text-sm text-white">Sign in to your account</p>
        </div>
        <form
          onSubmit={handleSubmit(signIn)}
          className="bg-white dark:bg-gray-700 py-8 px-6 shadow rounded-lg space-y-6"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email address
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                placeholder="you@example.com"
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-600 text-gray-800 dark:text-gray-100"
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
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
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
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-600 text-gray-800 dark:text-gray-100"
              />
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
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

          <div className="text-center text-sm text-gray-700 dark:text-gray-300">
            Don't have an account?{" "}
            <a
              href="/anonymous/signup"
              className="font-medium text-purple-700 dark:text-gray-600 hover:text-indigo-500"
            >
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
