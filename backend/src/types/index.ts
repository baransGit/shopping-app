import { JWTPayload } from "jose";

// User related types
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

// JWT related types - Extend Jose's JWTPayload
export interface JwtPayload extends JWTPayload {
  userId: number;
  email: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: UserResponse;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Stock related types
export interface StockResponse {
  productId: number;
  currentStock: number;
  available: boolean;
  maxAddableToCart: number;
  message?: string;
  lastUpdated: string;
}

// Request extensions
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
