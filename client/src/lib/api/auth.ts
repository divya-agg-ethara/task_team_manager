import { isAxiosError } from "axios";
import type { AuthSuccessBody } from "@/types/api";
import type { AuthUser, WorkspaceRole } from "@/types/auth";
import type { LoginFormValues, SignupFormValues } from "@/lib/validation/auth-schemas";
import { apiClient } from "@/lib/api/client";
import { parseApiError } from "@/lib/api/errors";

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
  role?: WorkspaceRole;
  createdAt?: string;
  updatedAt?: string;
}): AuthUser {
  return {
    id: u.id,
    email: u.email,
    name: u.name,
    role: u.role ?? "MEMBER",
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  };
}

type MeResponse = {
  success: true;
  data: { user: AuthUser };
};

type ErrorBody = {
  success?: boolean;
  message?: string;
  details?: unknown;
};

function isAuthSuccess(
  data: AuthSuccessBody | ErrorBody | undefined,
): data is AuthSuccessBody {
  return Boolean(data && "success" in data && data.success === true && "data" in data);
}

function isMeSuccess(data: MeResponse | ErrorBody | undefined): data is MeResponse {
  return Boolean(data && "success" in data && data.success === true && "data" in data);
}

function throwAuthError(
  res: { status: number; data?: ErrorBody },
  fallback: string,
): never {
  const message =
    (res.data && typeof res.data.message === "string" && res.data.message) ||
    fallback;
  throw new AuthApiError(message, res.status, res.data?.details);
}

function wrapAuthRequest<T>(fn: () => Promise<T>, fallback: string): Promise<T> {
  return fn().catch((error: unknown) => {
    if (error instanceof AuthApiError) throw error;

    if (isAxiosError(error)) {
      const status = error.response?.status ?? 0;
      const data = error.response?.data as ErrorBody | undefined;
      const message =
        (data?.message && String(data.message)) ||
        parseApiError(error, fallback);
      throw new AuthApiError(message, status, data?.details);
    }

    throw new AuthApiError(parseApiError(error, fallback), 0);
  });
}

export async function loginRequest(
  values: LoginFormValues,
): Promise<{ user: AuthUser; accessToken: string }> {
  return wrapAuthRequest(async () => {
    const res = await apiClient.post<AuthSuccessBody | ErrorBody>("/auth/login", values, {
      meta: { suppressToast: true, skipAuthClear: true },
    });

    if (res.status === 200 && isAuthSuccess(res.data)) {
      const { user, tokens } = res.data.data;
      return {
        user: mapUser(user),
        accessToken: tokens.accessToken,
      };
    }

    throwAuthError(res, "Invalid email or password.");
  }, "Unable to sign in. Check your credentials.");
}

export async function signupRequest(
  values: SignupFormValues,
): Promise<{ user: AuthUser; accessToken: string }> {
  return wrapAuthRequest(async () => {
    const res = await apiClient.post<AuthSuccessBody | ErrorBody>("/auth/signup", values, {
      meta: { suppressToast: true, skipAuthClear: true },
    });

    if ((res.status === 201 || res.status === 200) && isAuthSuccess(res.data)) {
      const { user, tokens } = res.data.data;
      return {
        user: mapUser(user),
        accessToken: tokens.accessToken,
      };
    }

    throwAuthError(res, "Could not create your account.");
  }, "Could not create your account.");
}

export async function fetchMe(): Promise<AuthUser> {
  return wrapAuthRequest(async () => {
    const res = await apiClient.get<MeResponse | ErrorBody>("/auth/me", {
      meta: { suppressToast: true, skipAuthClear: true },
    });

    if (res.status === 200 && isMeSuccess(res.data)) {
      return mapUser(res.data.data.user);
    }

    throwAuthError(res, "Could not load profile.");
  }, "Could not load profile.");
}

export async function updateProfileRequest(name: string): Promise<AuthUser> {
  return wrapAuthRequest(async () => {
    const res = await apiClient.patch<MeResponse | ErrorBody>("/auth/me", { name });

    if (res.status === 200 && isMeSuccess(res.data)) {
      return mapUser(res.data.data.user);
    }

    throwAuthError(res, "Could not update profile.");
  }, "Could not update profile.");
}

export async function changePasswordRequest(payload: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<void> {
  return wrapAuthRequest(async () => {
    const res = await apiClient.patch<{ success: true; message: string } | ErrorBody>(
      "/auth/password",
      payload,
    );

    if (
      res.status === 200 &&
      res.data &&
      "success" in res.data &&
      (res.data as { success?: boolean }).success
    ) {
      return;
    }

    throwAuthError(res, "Could not update password.");
  }, "Could not update password.");
}
