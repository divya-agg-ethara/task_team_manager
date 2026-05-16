import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/constants/config";
import { parseApiError } from "@/lib/api/errors";
import { useAuthStore } from "@/stores/auth-store";

declare module "axios" {
  export interface AxiosRequestConfig {
    meta?: {
      /** Skip global network error toast (caller handles UX). */
      suppressToast?: boolean;
      /** Do not clear auth session on 401 for this request. */
      skipAuthClear?: boolean;
    };
  }
}

type InternalConfig = InternalAxiosRequestConfig & {
  meta?: AxiosRequestConfig["meta"];
};

let lastNetworkToastAt = 0;
const NETWORK_TOAST_COOLDOWN_MS = 4000;

function shouldShowNetworkToast(config: InternalConfig | undefined): boolean {
  if (config?.meta?.suppressToast) return false;
  const url = config?.url ?? "";
  if (url.includes("/auth/login") || url.includes("/auth/signup")) return false;
  return true;
}

function showNetworkToast(message: string) {
  const now = Date.now();
  if (now - lastNetworkToastAt < NETWORK_TOAST_COOLDOWN_MS) return;
  lastNetworkToastAt = now;
  toast.error(message);
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20_000,
  validateStatus: (status) => status < 500,
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    const status = response.status;
    const config = response.config as InternalConfig;
    const url = config.url ?? "";

    if (
      status === 401 &&
      !config.meta?.skipAuthClear &&
      !url.includes("/auth/login") &&
      !url.includes("/auth/signup")
    ) {
      useAuthStore.getState().clearSession();
    }

    return response;
  },
  (error: AxiosError) => {
    const config = error.config as InternalConfig | undefined;

    if (!error.response && shouldShowNetworkToast(config)) {
      showNetworkToast(
        parseApiError(error, "Network error. Check your connection."),
      );
    }

    return Promise.reject(error);
  },
);
