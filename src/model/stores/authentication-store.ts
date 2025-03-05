import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { cookieStorage } from "./cookie-store";
import { AccountInfo, StoreInCookies } from "../domains/anonymous.domain";

type AuthenticationState = {
  authentication?: StoreInCookies;
};

type AuthenticationAction = {
  setAuthentication: (authentication?: StoreInCookies) => void;
};

export const useAuthentication = create(
  persist<AuthenticationState & AuthenticationAction>(
    (set) => ({
      authentication: undefined,
      setAuthentication: (auth) => {
        set((state) => ({ ...state, authentication: auth }));
      },
    }),
    {
      name: "job.recruit",
      storage: createJSONStorage(() => cookieStorage),
    }
  )
);
