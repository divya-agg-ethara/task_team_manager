import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s — TeamTask",
    default: "Auth",
  },
};

/**
 * Auth routes use full-viewport marketing-style layouts (no dashboard chrome).
 */
export default function AuthGroupLayout({ children }: { children: ReactNode }) {
  return children;
}
