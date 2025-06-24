import { Request, Response } from "express";
import {
  registerUserService,
  loginUserService,
  logoutUserService,
} from "../services/authService";
import { getUserById } from "../services/userService";
import { CreateUserDto, LoginDto } from "../types";

/**
 * Register new user
 */
export const registerController = async (req: Request, res: Response) => {
  try {
    const userData: CreateUserDto = req.body;
    const result = await registerUserService(userData);
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
 * Login user
 */
export const loginController = async (req: Request, res: Response) => {
  try {
    const loginData: LoginDto = req.body;
    console.log("Login attempt with:", loginData);
    const result = await loginUserService(loginData);
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

/**
 * Logout user
 */
export const logoutController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      res.status(401).json({
        success: false,
        message: "No token provided",
      });
      return;
    }

    await logoutUserService(token);
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
