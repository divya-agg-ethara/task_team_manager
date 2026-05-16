import axios, { type AxiosError } from "axios";
import { API_BASE_URL } from "@/lib/constants/config";
import { useAuthStore } from "@/stores/auth-store";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30_000,
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
    const url = response.config.url ?? "";

    if (
      status === 401 &&
      !url.includes("/auth/login") &&
      !url.includes("/auth/signup")
    ) {
      useAuthStore.getState().clearSession();
    }

    return response;
  },
  (error: AxiosError) => {
    if (!error.response) {
      import("sonner").then(({ toast }) =>
        toast.error("Network error. Check your connection."),
      );
    }
    return Promise.reject(error);
  },
);
