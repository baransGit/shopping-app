import { Router } from "express";
import {
  register,
  login,
  getCurrentUser,
  logout,
} from "../controllers/authController";
import { validateSchema } from "../middleware/validation";
import { authenticateToken } from "../middleware/auth";
import {
  validationRegisterSchema,
  validationLoginSchema,
} from "../../../shared/validations/authSchemas.js";

const router = Router();

/**
 * POST /auth/register
 * Register new user
 */

router.post("/register", validateSchema(validationRegisterSchema), register);

/**
 * POST /auth/login
 * Login user
 */

router.post("/login", validateSchema(validationLoginSchema), login);

/**
 * POST /auth/logout
 * Logout user (requires JWT)
 */
router.post("/logout", authenticateToken, logout);

/**
 * GET /auth/me
 * Get current user info (requires JWT)
 */

router.get("/me", authenticateToken, getCurrentUser);

export default router;
