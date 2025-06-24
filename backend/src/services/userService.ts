import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import {
  User,
  UserAddress,
  UserResponse,
  UpdateDetailsDto,
  AddressResponse,
  ChangePasswordDto,
} from "../types";
import { users } from "./authService";

export const updateUserDetailsService = async (
  userId: number,
  UpdateData: UpdateDetailsDto
): Promise<UserResponse> => {
  const { firstName, lastName, email, dateOfBirth } = UpdateData;

  const user = users.find((u: User) => u.id === userId);
  if (!user) {
    throw new Error("User not found");
  }

  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.dateOfBirth = dateOfBirth;
  user.updatedAt = new Date().toISOString();

  const userResponse: UserResponse = {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    dateOfBirth: user.dateOfBirth,
  };

  return userResponse;
};

export const updateUserAddressesService = async (
  userId: number,
  updatedAddress: UserAddress
): Promise<AddressResponse> => {
  const user = users.find((u: User) => u.id === userId);
  if (!user) throw new Error("User not found");
  if (!user.addressBook) {
    user.addressBook = [];
  }
  const addressIndex = user.addressBook.findIndex(
    (addr: UserAddress) => addr.id === updatedAddress.id
  );
  if (addressIndex === -1) {
    throw new Error("Address not found");
  }
  user.addressBook[addressIndex] = updatedAddress;
  user.updatedAt = new Date().toISOString();

  return {
    success: true,
    message: "Address updated successfully",
    address: updatedAddress,
  };
};

export const deleteUserAddressService = async (
  userId: number,
  addressIdToDelete: string
): Promise<{ success: boolean; message: string }> => {
  const user = users.find((u: User) => u.id === userId);
  if (!user) throw new Error("User not found");
  if (!user.addressBook || user.addressBook.length === 0) {
    throw new Error("Address book is empty");
  }
  const addressIndex = user.addressBook.findIndex(
    (addr: UserAddress) => addr.id === addressIdToDelete
  );
  if (addressIndex === -1) {
    throw new Error("Address not found");
  }
  user.addressBook.splice(addressIndex, 1);
  return {
    success: true,
    message: "Address deleted successfully",
  };
};

export const addUserAddressService = async (
  userId: number,
  addressData: Omit<UserAddress, "id">
): Promise<AddressResponse> => {
  try {
    const user = users.find((u: User) => u.id === userId);
    if (!user) throw new Error("User not found");
    const newAddress: UserAddress = {
      id: uuidv4(),
      ...addressData,
    };
    if (!user.addressBook) {
      user.addressBook = [];
    }
    user.addressBook.push(newAddress);
    return {
      success: true,
      message: "Address added successfully",
      address: newAddress,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to add address"
    );
  }
};

export const updatePasswordService = async (
  userId: number,
  passwordData: ChangePasswordDto
): Promise<{ success: boolean; message: string }> => {
  try {
    const { currentPassword, newPassword } = passwordData;
    const user = users.find((u: User) => u.id === userId);
    if (!user) throw new Error("User not found");
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Current password is incorrect");
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedNewPassword;

    return { success: true, message: "Password updated successfully" };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to update password"
    );
  }
};

export const getUserById = async (userId: number): Promise<UserResponse> => {
  const user = users.find((u: User) => u.id === userId);
  if (!user) throw new Error("User not found");

  const userResponse: UserResponse = {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    dateOfBirth: user.dateOfBirth,
    addressBook: user.addressBook,
  };
  return userResponse;
};
