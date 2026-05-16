"use client";

import { useSyncExternalStore } from "react";

function getMediaQuerySnapshot(query: string) {
  return () => window.matchMedia(query).matches;
}

function subscribeToMediaQuery(query: string, callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (cb) => subscribeToMediaQuery(query, cb),
    getMediaQuerySnapshot(query),
    () => false,
  );
}

export function useIsMobile(breakpoint = "(max-width: 767px)") {
  return useMediaQuery(breakpoint);
}
