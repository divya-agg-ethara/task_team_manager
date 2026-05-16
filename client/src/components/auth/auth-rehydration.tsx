"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";

/**
 * Kicks off Zustand persist rehydration once on the client (store uses skipHydration).
 * Mount inside AppProviders so it runs before AuthGuard / GuestOnly.
 */
export function AuthRehydration() {
  useEffect(() => {
    const api = useAuthStore.persist;
    if (!api) return;
    if (api.hasHydrated()) return;

    const result = api.rehydrate();
    if (result && typeof (result as Promise<void>).then === "function") {
      void (result as Promise<void>).catch(() => {
        /* errors surfaced via onRehydrateStorage; UI still unblocks via useAuthHydrated */
      });
    }
  }, []);

  return null;
}
