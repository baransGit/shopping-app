import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwt";
import {
  CreateUserDto,
  LoginDto,
  User,
  UserResponse,
  AuthResponse,
} from "../types";

// In-memory user storage (later replace with database)
const users: User[] = [];
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
    updatedAt: new Date().toISOString(),
  };
  users.push(newUser);
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
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
  return userResponse;
};
/**
 * Login user with email and password
 */
export const loginUser = async (LoginData: LoginDto): Promise<AuthResponse> => {
  const { username, password } = LoginData;

  console.log("Looking for user with username/email:", username);
  console.log(
    "Current users in array:",
    users.map((u) => ({ id: u.id, email: u.email, username: u.username }))
  );

  // Find user by email or username
  const user = users.find(
    (user) => user.email === username || user.username === username
  );
  if (!user) {
    throw new Error("User not found");
  }
  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  // Generate JWT token
  const token = await generateToken({ userId: user.id, email: user.email });

  // Prepare user response (without password)

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
    user: userResponse,
    token,
  };
};
export const logoutUser = async (token: string): Promise<void> => {
  blackListedToken.add(token);
  console.log(`Token blacklisted: ${token.substring(0, 20)}...`);
};

export const isTokenBlacklisted = (token: string): boolean => {
  return blackListedToken.has(token);
};
