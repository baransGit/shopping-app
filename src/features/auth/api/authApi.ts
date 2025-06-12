import { authApi } from "../../../shared/lib/axios";
import { AccountDetails } from "../../user/types";
import {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
  RegisterResponse,
  UpdateDetailsCredentials,
  UpdateDetailsResponse,
} from "../types/auth";

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data } = await authApi.post("/api/auth/login", credentials);
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await authApi.get("/api/auth/me");
    return data.user;
  },
  logout: async () => {
    await authApi.post("/api/auth/logout");
  },
  register: async (
    credentials: RegisterCredentials
  ): Promise<RegisterResponse> => {
    const { data } = await authApi.post("/api/auth/register", credentials);
    return data;
  },
  updateDetails: async (
    credentials: UpdateDetailsCredentials
  ): Promise<UpdateDetailsResponse> => {
    const { data } = await authApi.put("/api/auth/update", credentials);
    return data;
  },
};
