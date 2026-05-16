import {
  createJSONStorage,
  type StateStorage,
} from "zustand/middleware";

/**
 * SSR-safe storage for Zustand persist.
 * `localStorage` is not available during Next.js RSC / SSR; a noop storage
 * keeps persist middleware fully initialised so `useAuthStore.persist` always exists.
 */
const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

function getClientLocalStorage(): StateStorage {
  try {
    if (typeof window === "undefined") return noopStorage;
    return localStorage;
  } catch {
    return noopStorage;
  }
}

export const authPersistStorage = createJSONStorage(getClientLocalStorage);
