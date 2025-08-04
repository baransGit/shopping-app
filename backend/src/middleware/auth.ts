import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../config/jwt";
import { isTokenBlacklisted } from "src/services/authService";

/**
 * JWT Authentication Middleware
 * Verifies JWT token and adds user info to request
 */
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Access token required",
      });
      return;
    }
    if (isTokenBlacklisted(token)) {
      res.status(401).json({
        success: false,
        message: "Token is blacklisted",
      });
    }

    // Verify JWT token
    const payload = await verifyToken(token);

    // Add user info to request
    req.user = payload;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
