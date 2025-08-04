import { Router } from "express";
import {
  getCurrentUser,
  updateDetailsController,
  updatePasswordController,
  addUserAddressController,
  updateUserAddressController,
  deleteUserAddressController,
} from "../controllers/userController";
import {
  registerController,
  loginController,
  logoutController,
} from "../controllers/authController";
import { validateSchema } from "../middleware/validation";
import { authenticateToken } from "../middleware/auth";
import {
  validationRegisterSchema,
  validationLoginSchema,
  validationAccountDetailsSchema,
} from "../../../shared/validations/authSchemas.js";

const router = Router();

/**
 * POST /auth/register
 * Register new user
 */

router.post(
  "/register",
  validateSchema(validationRegisterSchema),
  registerController
);

/**
 * POST /auth/login
 * Login user
 */

router.post("/login", validateSchema(validationLoginSchema), loginController);

/**
 * POST /auth/logout
 * Logout user (requires JWT)
 */
router.post("/logout", authenticateToken, logoutController);

/**
 * GET /auth/me
 * Get current user info (requires JWT)
 */
router.put(
  "/update-details",
  authenticateToken,
  validateSchema(validationAccountDetailsSchema),
  updateDetailsController
);
router.post("/addAddress", authenticateToken, addUserAddressController);
router.put("/update-password", authenticateToken, updatePasswordController);
router.delete(
  "/deleteAddress/:addressId",
  authenticateToken,
  deleteUserAddressController
);
router.put(
  "/updateAddress/:addressId",
  authenticateToken,
  updateUserAddressController
);
router.get("/me", authenticateToken, getCurrentUser);

export default router;
