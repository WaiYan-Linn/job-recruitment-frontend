import { create } from "zustand";

interface AccessTokenState {
  accessToken?: string;
  setAccessToken: (token: string) => void;
}

export const useAccessToken = create<AccessTokenState>((set) => ({
  accessToken: undefined,
  setAccessToken: (token: string) => set({ accessToken: token }),
}));
