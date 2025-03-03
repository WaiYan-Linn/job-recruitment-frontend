"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  accountRegister,
  accountSignup,
} from "../../../model/clients/signup-client"; // Adjust the path accordingly

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      await accountRegister(form);
      sessionStorage.setItem("signupData", JSON.stringify(form));
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
      <div className="bg-white mt-12 dark:bg-gray-700 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
          Create Account
        </h2>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full px-4 py-3 mb-4 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full px-4 py-3 mb-4 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-4 py-3 mb-4 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full px-4 py-3 mb-6 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          onClick={handleSignup}
          disabled={loading}
          className={`w-full py-3 rounded-md font-semibold transition duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
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
