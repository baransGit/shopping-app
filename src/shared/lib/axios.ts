import axios from "axios";
import { tokenManager } from "../utils/tokenManager";

export const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

authApi.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Auth API Error", error);
    console.error("Error response data:", error.response?.data);
    console.error("Error status:", error.response?.status);
    if (error.response?.status === 401) {
      tokenManager.clearToken();
      // Optional: Reload page or redirect to login page
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error", error);
    return Promise.reject(error);
  }
);
