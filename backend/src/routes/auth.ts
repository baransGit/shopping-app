import { Router } from "express";
import { register, login, getCurrentUser } from "../controllers/authController";
import { validateSchema } from "../middleware/validation";
import {
  validationRegisterSchema,
  validationLoginSchema,
} from "../../../shared/validations/authSchemas";

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
 * GET /auth/me
 * Get current user info (requires JWT)
 */

router.get("/me", getCurrentUser);

export default router;
