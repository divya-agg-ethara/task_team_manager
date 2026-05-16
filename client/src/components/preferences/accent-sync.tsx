"use client";

import { useEffect } from "react";
import type { AccentColor } from "@/lib/preferences/types";
import { usePreferencesStore } from "@/stores/preferences-store";

const VALID_ACCENTS = new Set<AccentColor>(["copper", "sage", "coral", "graphite"]);

/** Applies accent + motion preferences to the document root. */
export function AccentSync() {
  const accent = usePreferencesStore((s) => s.accent);
  const setPreferences = usePreferencesStore((s) => s.setPreferences);
  const reduceMotion = usePreferencesStore((s) => s.reduceMotion);

  useEffect(() => {
    const resolved = VALID_ACCENTS.has(accent) ? accent : "copper";
    if (resolved !== accent) {
      setPreferences({ accent: resolved });
    }
    document.documentElement.dataset.accent = resolved;
  }, [accent, setPreferences]);

  useEffect(() => {
    if (reduceMotion) {
      document.documentElement.classList.add("reduce-motion");
    } else {
      document.documentElement.classList.remove("reduce-motion");
    }
  }, [reduceMotion]);

  return null;
}
