import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./types/auth";

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  registrationLoading: boolean;
  registrationError: string | null;
}
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  registrationLoading: false,
  registrationError: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    setLoginLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setLoginError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setRegistrationLoading: (state, action: PayloadAction<boolean>) => {
      state.registrationLoading = action.payload;
    },
    setRegistrationError: (state, action: PayloadAction<string | null>) => {
      state.registrationError = action.payload;
    },
    registrationSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.registrationLoading = false;
      state.registrationError = null;
    },
  },
});

export const {
  setUser,
  setToken,
  logout,
  setLoginLoading,
  setLoginError,
  setRegistrationError,
  setRegistrationLoading,
  registrationSuccess,
} = AuthSlice.actions;
export default AuthSlice.reducer;
