import type { Metadata } from "next";
import { SignupScreen } from "@/components/auth/signup-screen";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create your TeamTask workspace account.",
};

export default function SignupPage() {
  return <SignupScreen />;
}
