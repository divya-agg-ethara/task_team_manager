"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signupRequest } from "@/lib/api/auth";
import { parseApiError } from "@/lib/api/errors";
import {
  signupFormResolver,
  type SignupFormInput,
  type SignupFormValues,
} from "@/lib/validation/auth-schemas";
import { useAuthStore } from "@/stores/auth-store";

export function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setSession = useAuthStore((s) => s.setSession);

  const redirectTo = searchParams.get("from");
  const safeRedirect =
    redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")
      ? redirectTo
      : "/";

  const loginHref =
    redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")
      ? `/login?from=${encodeURIComponent(redirectTo)}`
      : "/login";

  const form = useForm<SignupFormInput, unknown, SignupFormValues>({
    resolver: signupFormResolver,
    defaultValues: { name: "", email: "", password: "" },
    mode: "onTouched",
  });

  async function onSubmit(values: SignupFormValues) {
    try {
      const { user, accessToken } = await signupRequest(values);
      setSession({ user, accessToken });
      toast.success("Account created — you’re in");
      router.replace(safeRedirect);
    } catch (e) {
      toast.error(parseApiError(e, "Could not create your account."));
    }
  }

  const pending = form.formState.isSubmitting;
  /** Watch can be undefined briefly before defaults hydrate — coerce for strength UI */
  const pwd = form.watch("password") ?? "";
  const strength =
    pwd.length === 0
      ? null
      : pwd.length < 8
        ? "weak"
        : !/[a-zA-Z]/.test(pwd) || !/[0-9]/.test(pwd)
          ? "weak"
          : "good";

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Create account
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Start your workspace
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          One account for projects, tasks, and team alignment.
        </p>
      </header>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
        noValidate
      >
        <div className="space-y-2">
          <label htmlFor="signup-name" className="text-sm font-medium text-foreground">
            Name
          </label>
          <Input
            id="signup-name"
            autoComplete="name"
            placeholder="Alex Morgan"
            disabled={pending}
            className="h-11 border-border/80 bg-background/80 text-base md:text-sm"
            aria-invalid={!!form.formState.errors.name}
            {...form.register("name")}
          />
          {form.formState.errors.name ? (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-medium text-destructive"
            >
              {form.formState.errors.name.message}
            </motion.p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="signup-email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <Input
            id="signup-email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            disabled={pending}
            className="h-11 border-border/80 bg-background/80 text-base md:text-sm"
            aria-invalid={!!form.formState.errors.email}
            {...form.register("email")}
          />
          {form.formState.errors.email ? (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-medium text-destructive"
            >
              {form.formState.errors.email.message}
            </motion.p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="signup-password" className="text-sm font-medium text-foreground">
            Password
          </label>
          <Input
            id="signup-password"
            type="password"
            autoComplete="new-password"
            placeholder="8+ characters, letters and numbers"
            disabled={pending}
            className="h-11 border-border/80 bg-background/80 text-base md:text-sm"
            aria-invalid={!!form.formState.errors.password}
            {...form.register("password")}
          />
          {strength ? (
            <p
              className={
                strength === "good"
                  ? "text-xs font-medium text-emerald-600 dark:text-emerald-400"
                  : "text-xs text-muted-foreground"
              }
            >
              {strength === "good"
                ? "Strong enough to continue"
                : "Use 8+ chars with letters and numbers"}
            </p>
          ) : null}
          {form.formState.errors.password ? (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-medium text-destructive"
            >
              {form.formState.errors.password.message}
            </motion.p>
          ) : null}
        </div>

        <motion.div layout className="pt-1">
          <Button
            type="submit"
            disabled={pending}
            className="relative h-11 w-full overflow-hidden text-sm font-medium shadow-md shadow-primary/15 transition-transform active:scale-[0.99]"
          >
            {pending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
                Creating account
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </motion.div>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href={loginHref}
          className="font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
