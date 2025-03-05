"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useAuthentication } from "@/model/stores/authentication-store";
import { useAccessToken } from "@/model/stores/use-accessToken";
import { usePathname } from "next/navigation";

type AuthContextType = {
  authentication?: boolean;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  authentication: false,
  signOut: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
  initialAccessToken: string;
};

export function AuthProvider({
  children,
  initialAccessToken,
}: AuthProviderProps) {
  const { setAuthentication } = useAuthentication();
  const { setAccessToken } = useAccessToken();
  const pathname = usePathname(); // Detect route changes

  const [authState, setAuthState] = useState<boolean>(!!initialAccessToken);

  async function refreshAccessToken() {
    try {
      const jobRecruitCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("job.recruit="))
        ?.split("=")[1];

      if (!jobRecruitCookie) return;

      const parsedCookie = JSON.parse(decodeURIComponent(jobRecruitCookie));
      const refreshToken = parsedCookie?.state?.authentication?.refreshToken;

      if (!refreshToken) return;

      const res = await fetch("http://localhost:8080/security/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (res.ok) {
        const data = await res.json();
        setAccessToken(data.accessToken);
        setAuthState(true);
      } else {
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  }

  useEffect(() => {
    // Initialize Zustand store with access token
    if (initialAccessToken) {
      setAccessToken(initialAccessToken);
      setAuthState(true);
    }
  }, [initialAccessToken, setAccessToken]);

  useEffect(() => {
    // Refresh token when route changes
    refreshAccessToken();
  }, [pathname]); // Runs whenever the route changes

  const signOut = () => {
    setAuthentication(undefined);
    setAccessToken("");
    document.cookie =
      "job.recruit=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ authentication: authState, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
