import { api } from "../../../shared/lib/axios";
import { LoginCredentials, LoginResponse } from "../types/auth";

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>("/auth/login", credentials);
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await api.get("/auth/me");
    return data;
  },
  logout: async () => {
    await api.post("/auth/logout");
  },
};
