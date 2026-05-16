"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  DEFAULT_PREFERENCES,
  type UserPreferences,
} from "@/lib/preferences/types";

type PreferencesState = UserPreferences & {
  setPreferences: (patch: Partial<UserPreferences>) => void;
  resetPreferences: () => void;
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      ...DEFAULT_PREFERENCES,
      setPreferences: (patch) => set((s) => ({ ...s, ...patch })),
      resetPreferences: () => set({ ...DEFAULT_PREFERENCES }),
    }),
    {
      name: "task-team-preferences",
      partialize: ({ setPreferences, resetPreferences, ...prefs }) => {
        void setPreferences;
        void resetPreferences;
        return prefs;
      },
    },
  ),
);
