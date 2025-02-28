"use client"; // Ensure this runs only on the client

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useAuthentication } from "@/model/stores/authentication-store";
import { AccountInfo } from "@/model/domains/anonymous.domain";

type AuthContextType = {
  authentication?: AccountInfo;
  signOut: () => void;
};

// Create and export the authentication context
export const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const { authentication, setAuthentication } = useAuthentication();
  const [authState, setAuthState] = useState<AccountInfo | undefined>(
    undefined
  );

  useEffect(() => {
    setAuthState(authentication);
  }, [authentication]);

  const signOut = () => {
    setAuthentication(undefined);
    localStorage.removeItem("job.recruit");
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
