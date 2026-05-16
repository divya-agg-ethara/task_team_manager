"use client";

import { Suspense } from "react";
import { GuestOnly } from "@/components/auth/guest-only";
import { AuthSplitShell } from "@/components/auth/auth-split-shell";
import { LoginForm } from "@/components/auth/login-form";

function FormFallback() {
  return (
    <div className="space-y-6 animate-pulse" aria-hidden>
      <div className="h-8 w-2/3 rounded-md bg-muted/80" />
      <div className="h-11 rounded-lg bg-muted/80" />
      <div className="h-11 rounded-lg bg-muted/80" />
      <div className="h-11 rounded-lg bg-muted/80" />
    </div>
  );
}

export function LoginScreen() {
  return (
    <GuestOnly>
      <AuthSplitShell>
        <Suspense fallback={<FormFallback />}>
          <LoginForm />
        </Suspense>
      </AuthSplitShell>
    </GuestOnly>
  );
}
