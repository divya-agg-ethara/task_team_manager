import { useAuthStore } from "@/stores/auth-store";

let rehydratePromise: Promise<void> | null = null;

/**
 * Ensures the persisted auth slice is loaded from localStorage exactly once.
 * Safe to call from multiple `useAuthHydrated` subscribers (AuthGuard + GuestOnly).
 */
export function waitForAuthRehydration(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  const api = useAuthStore.persist;
  if (!api || api.hasHydrated()) {
    return Promise.resolve();
  }

  if (!rehydratePromise) {
    rehydratePromise = Promise.resolve(void api.rehydrate())
      .then(() => undefined)
      .finally(() => {
        rehydratePromise = null;
      });
  }

  return rehydratePromise;
}
