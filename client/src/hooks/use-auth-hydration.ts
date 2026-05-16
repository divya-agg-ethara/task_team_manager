"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/auth-store";

const HYDRATION_FALLBACK_MS = 2500;

function readHasHydrated(): boolean {
  if (typeof window === "undefined") return false;
  return useAuthStore.persist?.hasHydrated() ?? false;
}

/**
 * Returns true after Zustand persist has finished rehydrating on the client.
 * Rehydration is started by {@link AuthRehydration} in AppProviders.
 */
export function useAuthHydrated(): boolean {
  const [hydrated, setHydrated] = useState(readHasHydrated);

  useEffect(() => {
    const api = useAuthStore.persist;

    if (!api) {
      setHydrated(true);
      return;
    }

    if (api.hasHydrated()) {
      setHydrated(true);
      return;
    }

    const unsub = api.onFinishHydration(() => setHydrated(true));
    const fallback = window.setTimeout(() => setHydrated(true), HYDRATION_FALLBACK_MS);

    return () => {
      unsub();
      window.clearTimeout(fallback);
    };
  }, []);

  return hydrated;
}
