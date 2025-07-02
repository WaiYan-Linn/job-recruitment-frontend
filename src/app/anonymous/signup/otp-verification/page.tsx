"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { accountRegister, accountSignup } from "@/model/clients/signup-client"; // Adjust the path accordingly
import axios from "axios";
import { useAuthentication } from "@/model/stores/authentication-store";
import { useAccessToken } from "@/model/stores/use-accessToken";

export default function OTPVerificationPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [signupData, setSignupData] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    // Retrieve stored form data
    const data = sessionStorage.getItem("signupData");
    if (data) {
      setSignupData(JSON.parse(data));
    }
  }, [router]);

  const handleSignup = async () => {
    if (!signupData) return;
    setLoading(true); // Start loading

    try {
      const result = await accountSignup(signupData, otp);
      console.log("Signup success:", result);

      // Update access token in memory
      const { setAccessToken } = useAccessToken.getState();
      setAccessToken(result.accessToken);

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
      } // Redirect to success page

      // Handle the success response (e.g., store token or redirect)
    } catch (err) {
      console.error("Signup failed:", err);
      setError("Signup failed, please try again");
    } finally {
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-200 to-blue-400">
      <div className="bg-white p-24 dark:bg-gray-300 rounded-2xl shadow-2xl w-96">
        <h2 className="text-2xl font-bold mb-12 text-center text-gray-800">
          OTP Verification
        </h2>
        <p className="text-center text-gray-600  mb-4">
          Enter the OTP sent to your Gmail.
        </p>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full px-3 pl-1 py-2 dark:bg-gray-200 dark:text-gray-600 border rounded-lg mb-3 focus:ring-2 focus:ring-blue-400 text-center"
        />
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}
        <button
          onClick={handleSignup}
          className={`w-full py-2 rounded-lg font-semibold transition duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? "Verfiying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}
