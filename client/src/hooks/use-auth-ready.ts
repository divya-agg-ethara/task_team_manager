"use client";

import { useAuthHydrated } from "@/hooks/use-auth-hydration";
import { useAuthStore } from "@/stores/auth-store";

/**
 * True when persisted auth has rehydrated and a valid session is available for API calls.
 */
export function useAuthReady(): boolean {
  const hydrated = useAuthHydrated();
  const accessToken = useAuthStore((s) => s.accessToken);
  const userId = useAuthStore((s) => s.user?.id);

  return hydrated && Boolean(accessToken && userId);
}
