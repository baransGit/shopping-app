import { authApi } from "../../../shared/lib/axios";
import {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
  RegisterResponse,
} from "../types/auth";

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data } = await authApi.post("/auth/login", credentials);
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await authApi.get("/auth/me");
    return data;
  },
  logout: async () => {
    await authApi.post("/auth/logout");
  },
  register: async (
    credentials: RegisterCredentials
  ): Promise<RegisterResponse> => {
    const { data } = await authApi.post("/auth/register", credentials);
    return data;
  },
};
