import { useMutation, useQuery } from "@tanstack/react-query";
import { authAPI } from "../api/authApi";
import {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
  RegisterResponse,
  User,
} from "../types/auth";
import { useNavigation } from "../../../shared/hooks/useNavigation";
export const useAuth = () => {
  const navigation = useNavigation();

  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["user"],
    queryFn: () => authAPI.getCurrentUser(),
    enabled: !!localStorage.getItem("token"),
  });
  const login = useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: (credentials) => authAPI.login(credentials),
    onSuccess: (data) => {
      if ("token" in data) {
        localStorage.setItem("token", data.token);
        navigation.goToHome();
      }
    },
  });
  const register = useMutation<RegisterResponse, Error, RegisterCredentials>({
    mutationFn: (credentials) => authAPI.register(credentials),
    onSuccess: (data) => {
      if ("token" in data) {
        localStorage.setItem("token", data.token);
        navigation.goToHome();
      }
    },
  });

  const logout = useMutation({
    mutationFn: () => authAPI.logout(),
    onSuccess: () => {
      localStorage.removeItem("token");
    },
  });

  return {
    login,
    register,
    logout,
    user,
    isLoading,
    isAuthenticated: !!user,
  };
};
