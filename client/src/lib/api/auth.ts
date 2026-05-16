import type { AuthSuccessBody } from "@/types/api";
import type { AuthUser } from "@/types/auth";
import type { LoginFormValues, SignupFormValues } from "@/lib/validation/auth-schemas";
import { apiClient } from "@/lib/api/client";

export class AuthApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public details?: unknown,
  ) {
    super(message);
    this.name = "AuthApiError";
  }
}

function mapUser(u: {
  id: string;
  email: string;
  name: string;
}): AuthUser {
  return { id: u.id, email: u.email, name: u.name };
}

export async function loginRequest(
  values: LoginFormValues,
): Promise<{ user: AuthUser; accessToken: string }> {
  const res = await apiClient.post<AuthSuccessBody>("/auth/login", values);

  if (res.status === 200 && res.data?.success && res.data.data) {
    const { user, tokens } = res.data.data;
    return {
      user: mapUser(user),
      accessToken: tokens.accessToken,
    };
  }

  const message =
    (res.data && "message" in res.data && (res.data as { message?: string }).message) ||
    "Unable to sign in. Check your credentials.";
  throw new AuthApiError(message, res.status, (res.data as { details?: unknown })?.details);
}

export async function signupRequest(
  values: SignupFormValues,
): Promise<{ user: AuthUser; accessToken: string }> {
  const res = await apiClient.post<AuthSuccessBody>("/auth/signup", values);

  if ((res.status === 201 || res.status === 200) && res.data?.success && res.data.data) {
    const { user, tokens } = res.data.data;
    return {
      user: mapUser(user),
      accessToken: tokens.accessToken,
    };
  }

  const message =
    (res.data && "message" in res.data && (res.data as { message?: string }).message) ||
    "Could not create your account.";
  throw new AuthApiError(message, res.status, (res.data as { details?: unknown })?.details);
}
