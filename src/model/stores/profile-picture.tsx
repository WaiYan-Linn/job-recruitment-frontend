import { create } from "zustand";

interface ProfileState {
  profilePicture: string | null;
  setProfilePicture: (url: string | null) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profilePicture: null,
  setProfilePicture: (url) => set({ profilePicture: url }),
}));
