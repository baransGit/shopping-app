export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt?: string;
}
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
export interface AuthError {
  field: string;
  message: string;
}
export interface AuthErrorResponse {
  success: false;
  errors: AuthError[];
  message: string;
}
export interface AuthSuccessResponse {
  success: boolean;
  user: User;
  token: string;
  message?: string;
}

export type LoginResponse = AuthSuccessResponse | AuthErrorResponse;
export type RegisterResponse = AuthSuccessResponse | AuthErrorResponse;
