import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { authAPI } from "../api/authApi";
import { LoginCredentials } from "../types/auth";
import { setUser, setToken, logout, setLoading, setError } from "../slice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  );
  const login = async (credentials: LoginCredentials) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const response = await authAPI.login(credentials);
      dispatch(setUser(response.user));
      dispatch(setToken(response.token));
    } catch (error) {
      dispatch(setError("Login Failed"));
    } finally {
      dispatch(setLoading(false));
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
    logout: logoutUser,
  };
};
