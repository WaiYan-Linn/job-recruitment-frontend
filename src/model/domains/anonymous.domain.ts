import { Role } from "./types";

export type SignInForm = {
  email: string;
  password: string;
};

export type AccountInfo = {
  name: string;
  email: string;
  role: Role;
  accessToken: string;
  refreshToken: string;
};
export type StoreInCookies = {
  name: string;
  email: string;
  role: Role;
  refreshToken: string;
};

export type OtpCode = {
  code: string;
};

export type isAuthenticated = {
  isAuthenticated: boolean;
};

export type AccessToken = {
  name: string;
};

export type SignUpForm = {
  name?: string;
  phone: string;
  email: string;
  password: string;
  role: string;
};

export type RefreshForm = {
  refreshToken: string;
};
