import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authAPI } from "../api/authApi";
import {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
  RegisterResponse,
  UpdateDetailsCredentials,
  UpdateDetailsResponse,
} from "../types/auth";
import { User } from "../../user/types";
import { useNavigation } from "../../../shared/hooks/useNavigation";
import { tokenManager } from "../../../shared/utils/tokenManager";
export const useAuth = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["user"],
    queryFn: () => authAPI.getCurrentUser(),
    enabled: tokenManager.hasToken(),
  });
  const login = useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: (credentials) => authAPI.login(credentials),
    onSuccess: (data) => {
      if ("token" in data) {
        tokenManager.setToken(data.token);
        navigation.goToHome();
      }
    },
  });
  const register = useMutation<RegisterResponse, Error, RegisterCredentials>({
    mutationFn: (credentials) => authAPI.register(credentials),
    onSuccess: (data) => {
      if ("token" in data) {
        tokenManager.setToken(data.token);
        navigation.goToHome();
      }
    },
  });

  const logout = useMutation({
    mutationFn: () => authAPI.logout(),
    onSuccess: () => {
      tokenManager.clearAuth(queryClient);
      navigation.goToLogin();
    },
  });
  const updateDetails = useMutation<
    UpdateDetailsResponse,
    Error,
    UpdateDetailsCredentials
  >({
    mutationFn: (credentials) => authAPI.updateDetails(credentials),
  });

  return {
    login,
    register,
    logout,
    user,
    updateDetails,
    isLoading,
    isAuthenticated: !!user,
  };
};
