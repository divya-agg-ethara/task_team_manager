import type { Metadata } from "next";
import { LoginScreen } from "@/components/auth/login-screen";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your TeamTask workspace.",
};

export default function LoginPage() {
  return <LoginScreen />;
}
