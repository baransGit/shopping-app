import { User, AccountDetails } from "../../user/types";

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
  firstName: string;
  lastName: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
export type UpdateDetailsCredentials = Omit<AccountDetails, "updatedAt">;

export interface AuthError {
  field: string;
  message: string;
}

export interface AuthErrorResponse {
  success: false;
  errors?: AuthError[];
  message: string;
}

export interface AuthSuccessResponse {
  success: boolean;
  user: User;
  token: string;
  message?: string;
}
//Update details doesnt return token, so we omit
export type UpdateDetailsSuccessResponse = Omit<AuthSuccessResponse, "token">;

export type LoginResponse = AuthSuccessResponse | AuthErrorResponse;
export type RegisterResponse = AuthSuccessResponse | AuthErrorResponse;
export type UpdateDetailsResponse =
  | UpdateDetailsSuccessResponse
  | AuthErrorResponse;
