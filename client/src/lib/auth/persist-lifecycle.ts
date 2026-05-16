import { useAuthStore } from "@/stores/auth-store";

let rehydratePromise: Promise<void> | null = null;

const HYDRATION_TIMEOUT_MS = 3000;

/**
 * Ensures the persisted auth slice is loaded from localStorage exactly once.
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
    rehydratePromise = new Promise<void>((resolve) => {
      let settled = false;

      const done = () => {
        if (settled) return;
        settled = true;
        unsub();
        window.clearTimeout(timeout);
        resolve();
      };

      const unsub = api.onFinishHydration(done);
      const timeout = window.setTimeout(done, HYDRATION_TIMEOUT_MS);

      try {
        const result = api.rehydrate();
        if (result && typeof (result as Promise<void>).then === "function") {
          void (result as Promise<void>).finally(done);
        }
      } catch {
        done();
      }
    }).finally(() => {
      rehydratePromise = null;
    });
  }

  return rehydratePromise;
}
