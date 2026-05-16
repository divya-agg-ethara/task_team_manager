"use client";

import { useEffect } from "react";
import { fetchMe } from "@/lib/api/auth";
import { useAuthHydrated } from "@/hooks/use-auth-hydration";
import { useAuthStore } from "@/stores/auth-store";

/** Refreshes user profile (including role) after auth has rehydrated. */
export function SessionSync() {
  const hydrated = useAuthHydrated();
  const accessToken = useAuthStore((s) => s.accessToken);
  const updateUser = useAuthStore((s) => s.updateUser);

  useEffect(() => {
    if (!hydrated || !accessToken) return;

    void fetchMe()
      .then(updateUser)
      .catch(() => {
        /* Invalid session cleared by API client on 401 */
      });
  }, [hydrated, accessToken, updateUser]);

  return null;
}
