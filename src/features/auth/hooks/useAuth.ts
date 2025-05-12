import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { authAPI } from "../api/authApi";
import {
  LoginCredentials,
  RegisterCredentials,
  AuthError,
  AuthSuccessResponse,
} from "../types/auth";
import {
  setUser,
  setToken,
  logout,
  setLoginLoading,
  setLoginError,
  setRegistrationError,
  setRegistrationLoading,
} from "../slice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  );
  const login = async (credentials: LoginCredentials) => {
    try {
      dispatch(setLoginLoading(true));
      dispatch(setLoginError(null));
      const response = await authAPI.login(credentials);

      if ("errors" in response) {
        const errorMessage =
          response.errors
            ?.map((err: AuthError) => `${err.field}: ${err.message}`)
            .join(", ") || response.message;
        dispatch(setLoginError(errorMessage));
        return;
      }

      const successResponse = response as AuthSuccessResponse;

      dispatch(setUser(successResponse.user));
      dispatch(setToken(successResponse.token));
    } catch (error) {
      dispatch(setLoginError("Server Error :Login failed"));
    } finally {
      dispatch(setLoginLoading(false));
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      dispatch(setRegistrationLoading(true));
      dispatch(setRegistrationError(null));
      const response = await authAPI.register(credentials);
      if ("errors" in response) {
        const errorMessage =
          response.errors
            ?.map((err: AuthError) => `${err.field}:${err.message}`)
            .join(", ") || response.message;
        dispatch(setRegistrationError(errorMessage));
        return;
      }
      const successResponse = response as AuthSuccessResponse;
      dispatch(setUser(successResponse.user));
      dispatch(setToken(successResponse.token));
    } catch (error) {
      dispatch(setRegistrationError("Registration Failed"));
    } finally {
      dispatch(setRegistrationLoading(false));
    }
  };
  const logoutUser = async () => {
    try {
      await authAPI.logout();
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout: logoutUser,
  };
};
