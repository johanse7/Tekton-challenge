// api/axiosInstance.ts
import { useAuthStore } from "@/features/auth/store/authStore";
import axios from "axios";

const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState()?.user?.token;

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    let message = "Unexpected error. Please try again.";

    if (status === 404) message = "Resource not found.";
    if (status === 500) message = "Internal server error.";

    return Promise.reject({
      status,
      message,
      original: error,
    });
  }
);

export default api;
