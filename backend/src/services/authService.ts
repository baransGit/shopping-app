import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwt";
import {
  CreateUserDto,
  LoginDto,
  UserResponse,
  AuthResponse,
  User,
} from "../types";

// In-memory user storage (later replace with database)
export const users: User[] = [];
const blackListedToken = new Set<string>();
let userIdCounter = 1;

// Add a test user for development
const initializeTestUser = () => {
  const testPassword = bcrypt.hashSync("Test123", 12);
  const testUser: User = {
    id: userIdCounter++,
    username: "testuser",
    email: "test@test.com",
    firstName: "Test",
    lastName: "User",
    password: testPassword,
    addressBook: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  users.push(testUser);
  console.log("Test user created: test@test.com / Test123");
};

// Initialize test user
initializeTestUser();

/**
 * Register new user with hashed password
 */
export const registerUserService = async (userData: CreateUserDto) => {
  const { email, password } = userData;

  // Check if user already exists
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create new user
  const newUser: User = {
    id: userIdCounter++,
    ...userData,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  users.push(newUser);

  // Generate JWT token
  const token = await generateToken({
    userId: newUser.id,
    email: newUser.email,
  });

  const userResponse: UserResponse = {
    id: newUser.id,
    username: newUser.username,
    email: newUser.email,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    createdAt: newUser.createdAt,
    updatedAt: newUser.updatedAt,
  };

  return {
    message: "Registration successful",
    token,
    user: userResponse,
  };
};

/**
 * Login user with email and password
 */
export const loginUserService = async (loginData: LoginDto) => {
  const { username, password } = loginData;

  // Find user by username
  const user = users.find((u) => u.username === username);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // Generate JWT token
  const token = await generateToken({
    userId: user.id,
    email: user.email,
  });

  const userResponse: UserResponse = {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return {
    message: "Login successful",
    token,
    user: userResponse,
  };
};

export const logoutUserService = async (token: string) => {
  blackListedToken.add(token);
  return true;
};

export const isTokenBlacklisted = (token: string): boolean => {
  return blackListedToken.has(token);
};
