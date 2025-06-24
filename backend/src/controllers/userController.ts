import { Request, Response } from "express";
import {
  getUserById,
  updateUserDetailsService,
  updatePasswordService,
  addUserAddressService,
  updateUserAddressesService,
  deleteUserAddressService,
} from "../services/userService";

export const updateUserAddressController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const addressId = req.params.addressId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
      return;
    }

    const updatedAddress = {
      ...req.body,
      id: addressId,
    };

    const result = await updateUserAddressesService(userId, updatedAddress);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update address",
    });
  }
};

export const updatePasswordController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
      return;
    }
    const result = await updatePasswordService(userId, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Password update failed",
    });
  }
};

export const addUserAddressController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
      return;
    }
    const result = await addUserAddressService(userId, req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to add address",
    });
  }
};

export const updateDetailsController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (userId === undefined) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }
    const updateData = req.body;
    const updatedUser = await updateUserDetailsService(userId, updateData);
    res.json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Update failed",
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

export const deleteUserAddressController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const addressId = req.params.addressId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
      return;
    }

    const result = await deleteUserAddressService(userId, addressId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete address",
    });
  }
};
