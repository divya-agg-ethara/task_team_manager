"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "@/types/auth";
import { authPersistStorage } from "@/lib/storage/auth-json-storage";

export interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;
  setSession: (payload: { accessToken: string; user: AuthUser }) => void;
  updateUser: (user: AuthUser) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      setSession: ({ accessToken, user }) =>
        set({ accessToken, user }),
      updateUser: (user) =>
        set((s) => (s.accessToken ? { user } : { user: null })),
      clearSession: () => set({ accessToken: null, user: null }),
    }),
    {
      name: "task-team-auth",
      storage: authPersistStorage,
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
      }),
      merge: (persisted, current) => {
        const p = persisted as Partial<AuthState> | undefined;
        if (
          !p ||
          typeof p.accessToken !== "string" ||
          p.accessToken.length === 0 ||
          !p.user ||
          typeof p.user.id !== "string" ||
          typeof p.user.email !== "string" ||
          typeof p.user.name !== "string"
        ) {
          return current;
        }
        const role =
          p.user.role === "ADMIN" || p.user.role === "MEMBER"
            ? p.user.role
            : "MEMBER";
        return {
          ...current,
          accessToken: p.accessToken,
          user: { ...p.user, role },
        };
      },
      onRehydrateStorage: () => (_state, error) => {
        if (error) {
          console.warn("[auth] Failed to restore session from storage", error);
        }
      },
      /**
       * Next.js: avoid hydrating from localStorage during SSR.
       * Client calls `persist.rehydrate()` once in `AuthRehydration`.
       */
      skipHydration: true,
    },
  ),
);
