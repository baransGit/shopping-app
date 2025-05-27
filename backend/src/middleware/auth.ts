import { Request, Response, NextFunction } from "express";
import { verifyToken } from "src/config/jwt";

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
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Access token required",
      });
      return;
    }
    //verify token
    const payload = await verifyToken(token);
    req.user = payload;
    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
