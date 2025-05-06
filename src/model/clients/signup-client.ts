import axios from "axios";
import { BASE_URL } from "../utils";
import { SignUpForm, AccountInfo, OtpCode } from "../domains/anonymous.domain";
import { client } from "../utils";

export async function accountSignup(
  form: SignUpForm,
  otp: string
): Promise<AccountInfo> {
  try {
    // Send the SignUpForm data and OTP (code) as query param
    const response = await client.post<AccountInfo>("/security/signup", form, {
      params: {
        code: otp, // Pass the OTP (entered by the user) here
      },
    });
    return response.data;
  } catch (error) {
    console.error("Signup failed:", error);
    throw error;
  }
}
export async function accountRegister(form: SignUpForm): Promise<string> {
  try {
    const response = await client.post<string>("/security/register", form);
    return response.data; // Should return "OTP sent" or a success message
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
}
