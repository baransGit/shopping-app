import { Request, Response } from "express";
import {
  registerUser,
  getUserById,
  loginUser,
  logoutUser,
} from "../services/authService";
import { CreateUserDto, LoginDto } from "../types";

/**
 * Register new user
 */
export const register = async (req: Request, res: Response) => {
  try {
    const userData: CreateUserDto = req.body;
    const result = await registerUser(userData);
    res.status(201).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Registration failed",
    });
  }
};
/**
 * Login user (placeholder - will implement later)
 */
export const login = async (req: Request, res: Response) => {
  try {
    const loginData: LoginDto = req.body;
    console.log("Login attempt with:", loginData);
    const result = await loginUser(loginData);
    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.log(
      "Login error:",
      error instanceof Error ? error.message : "Unknown error"
    );
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Login failed",
    });
  }
};

export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId; // Assuming userId is set in the request by auth middleware
    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
      return;
    }

    const user = await getUserById(userId);
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : "User not found",
    });
  }
};

/**
 * Logout user
 */
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      res.status(401).json({
        success: false,
        message: "No token provided",
      });
      return;
    }

    await logoutUser(token);
    res.json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Logout failed",
    });
  }
};
