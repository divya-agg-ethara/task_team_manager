"use client";

import { useEffect, useState } from "react";
import { waitForAuthRehydration } from "@/lib/auth/persist-lifecycle";

const HYDRATION_FALLBACK_MS = 5000;

/**
 * Returns true after Zustand persist has finished rehydrating on the client.
 */
export function useAuthHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const timer = window.setTimeout(() => {
      if (!cancelled) setHydrated(true);
    }, HYDRATION_FALLBACK_MS);

    void waitForAuthRehydration().finally(() => {
      if (!cancelled) setHydrated(true);
      window.clearTimeout(timer);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  return hydrated;
}
