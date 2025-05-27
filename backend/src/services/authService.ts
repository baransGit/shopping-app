import bcrypt from "bcryptjs";
import { generateToken } from "src/config/jwt";
import {
  CreateUserDto,
  LoginDto,
  User,
  UserResponse,
  AuthResponse,
} from "../types";

// In-memory user storage (later replace with database)
const users: User[] = [];
let userIdCounter = 1;

/**
 * Register new user with hashed password
 */

export const registerUser = async (
  userData: CreateUserDto
): Promise<AuthResponse> => {
  const { username, email, password, firstName, lastName } = userData;
  const existingUser = users.find(
    (user) => user.email === email || user.username === username
  );
  if (existingUser) {
    throw new Error(
      existingUser.email === email
        ? "Email already exist"
        : "Username already taken"
    );
  }
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser: User = {
    id: userIdCounter++,
    username,
    email,
    firstName,
    lastName,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  const token = await generateToken({
    userId: newUser.id,
    email: newUser.email,
  });

  const userResponse: UserResponse = {
    id: newUser.id,
    email: newUser.email,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
  };
  return {
    message: "User registered successfully",
    user: userResponse,
    token,
  };
};
export const getUserById = async (userId: number): Promise<UserResponse> => {
  const user = users.find((user) => user.id === userId);
  if (!user) throw new Error("User not found");

  const userResponse: UserResponse = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
  return userResponse;
};
