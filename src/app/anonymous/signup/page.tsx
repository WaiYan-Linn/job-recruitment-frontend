"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  accountRegister,
  accountSignup,
} from "../../../model/clients/signup-client"; // Adjust the path accordingly
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false); // Loading state

  const handleSignup = async () => {
    setLoading(true); // Start loading

    try {
      await accountRegister(form); // Call API after navigation

      sessionStorage.setItem("signupData", JSON.stringify(form)); // Store data first

      router.push("/anonymous/signup/otp-verification"); // Navigate immediately
    } catch (error) {
      console.error("Signup failed:", error);
      sessionStorage.removeItem("signupData"); // Remove invalid data if request fails
    } finally {
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-200 via-indigo-500 to-blue-400">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 bg-gradient-to-t from-blue-400 to-indigo-500 text-transparent bg-clip-text">
          Create Account
        </h2>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full text-gray-900 dark:text-gray-200 px-4 py-2 border rounded-lg mb-3 focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full text-gray-900 dark:text-gray-200 px-4 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-4 py-2 text-gray-900 dark:text-gray-200 border rounded-lg mb-3 focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full px-4 text-gray-900 dark:text-gray-200  py-2 border rounded-lg mb-3 focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleSignup}
          className={`w-full py-2 rounded-lg font-semibold transition duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/anonymous/signin" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
