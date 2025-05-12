import { api } from "../../../shared/lib/axios";
import {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
  RegisterResponse,
} from "../types/auth";

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
  register: async (
    credentials: RegisterCredentials
  ): Promise<RegisterResponse> => {
    const { data } = await api.post("/auth/register");
    return data;
  },
};
