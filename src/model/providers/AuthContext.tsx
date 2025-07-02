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

// === Context Type ===
type AuthContextType = {
  authentication?: boolean;
  signOut: () => void;
  role: string | null;
};

// === Create Context ===
export const AuthContext = createContext<AuthContextType>({
  authentication: false,
  signOut: () => {},
  role: null,
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
  const pathname = usePathname();

  const [authState, setAuthState] = useState<boolean>(!!initialAccessToken);
  const [role, setRole] = useState<string | null>(null);

  // === Refresh Token on Route Change ===
  async function refreshAccessToken() {
    try {
      const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("job.recruit="))
        ?.split("=")[1];

      if (!cookieValue) return;

      const parsed = JSON.parse(decodeURIComponent(cookieValue));
      const refreshToken = parsed?.state?.authentication?.refreshToken;
      const extractedRole = parsed?.state?.authentication?.role;

      if (extractedRole) setRole(extractedRole);
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
        console.warn("Failed to refresh access token");
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  }

  // === Set Token and Role Initially ===
  useEffect(() => {
    if (typeof document === "undefined") return;

    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("job.recruit="))
      ?.split("=")[1];

    if (!cookieValue) return;

    try {
      const parsed = JSON.parse(decodeURIComponent(cookieValue));
      const accessToken = initialAccessToken;
      const extractedRole = parsed?.state?.authentication?.role;

      if (accessToken) {
        setAccessToken(accessToken);
        setAuthState(true);
      }

      if (extractedRole) {
        setRole(extractedRole);
      }
    } catch (e) {
      console.error("Failed to parse job.recruit cookie:", e);
    }
  }, [initialAccessToken]);

  // === Refresh on Route Change ===
  useEffect(() => {
    refreshAccessToken();
  }, [pathname]);

  // === Sign Out ===
  const signOut = () => {
    setAuthentication(undefined);
    setAccessToken("");
    setAuthState(false);
    setRole(null);
    document.cookie =
      "job.recruit=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ authentication: authState, signOut, role }}>
      {children}
    </AuthContext.Provider>
  );
}

// === useAuth Hook ===
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
