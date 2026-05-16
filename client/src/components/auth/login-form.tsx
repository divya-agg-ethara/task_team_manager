"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginRequest, AuthApiError } from "@/lib/api/auth";
import {
  loginFormResolver,
  type LoginFormInput,
  type LoginFormValues,
} from "@/lib/validation/auth-schemas";
import { useAuthStore } from "@/stores/auth-store";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setSession = useAuthStore((s) => s.setSession);

  const form = useForm<LoginFormInput, unknown, LoginFormValues>({
    resolver: loginFormResolver,
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  const redirectTo = searchParams.get("from");
  const safeRedirect =
    redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")
      ? redirectTo
      : "/";

  const signupHref =
    redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")
      ? `/signup?from=${encodeURIComponent(redirectTo)}`
      : "/signup";

  async function onSubmit(values: LoginFormValues) {
    try {
      const { user, accessToken } = await loginRequest(values);
      setSession({ user, accessToken });
      toast.success("Welcome back");
      router.replace(safeRedirect);
    } catch (e) {
      if (e instanceof AuthApiError) {
        toast.error(e.message);
        return;
      }
      toast.error("Something went wrong. Try again.");
    }
  }

  const pending = form.formState.isSubmitting;

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Sign in
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Welcome back
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Enter your credentials to access your workspace.
        </p>
      </header>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
        noValidate
      >
        <div className="space-y-2">
          <label htmlFor="login-email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <Input
            id="login-email"
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
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="login-password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <span className="text-xs text-muted-foreground">Secured with JWT</span>
          </div>
          <Input
            id="login-password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            disabled={pending}
            className="h-11 border-border/80 bg-background/80 text-base md:text-sm"
            aria-invalid={!!form.formState.errors.password}
            {...form.register("password")}
          />
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
                Signing in
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </motion.div>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href={signupHref}
          className="font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
        >
          Create one
        </Link>
      </p>
    </div>
  );
}
