import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwt";
import {
  CreateUserDto,
  LoginDto,
  User,
  UserResponse,
  AuthResponse,
  UpdateDetailsDto,
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
  const emailExist = users.find((user) => user.email === email);
  const usernameExist = users.find((user) => user.username === username);
  if (emailExist && usernameExist) {
    throw new Error(
      "Email and username  are already taken. Please choose another."
    );
  } else if (emailExist) {
    throw new Error("Email is already taken. Please choose another.");
  } else if (usernameExist) {
    throw new Error("Username is already taken. Please choose another.");
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

/**
 * Login user with email and password
 */
export const loginUser = async (userData: LoginDto): Promise<AuthResponse> => {
  const { username, password } = userData;

  console.log("🔍 Login attempt with username/email:", username);
  console.log("🔍 Current users in array:");
  users.forEach((u) => {
    console.log(`  - ID: ${u.id}, Username: ${u.username}, Email: ${u.email}`);
  });

  // Find user by email or username
  const user = users.find(
    (user) => user.email === username || user.username === username
  );

  if (!user) {
    console.log("❌ User not found with username/email:", username);
    throw new Error("User not found");
  }

  console.log("✅ User found:", {
    id: user.id,
    username: user.username,
    email: user.email,
  });

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    console.log("❌ Invalid password for user:", user.username);
    throw new Error("Invalid password");
  }

  console.log("✅ Password valid, generating token...");

  // Generate JWT token
  const token = await generateToken({ userId: user.id, email: user.email });

  console.log("✅ Token generated with email:", user.email);

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

  console.log("✅ Login successful for user:", userResponse.email);

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
export const updateUserDetails = async (
  userId: number,
  UpdateData: UpdateDetailsDto
): Promise<UserResponse> => {
  const { firstName, lastName, email, dateOfBirth, updatedAt } = UpdateData;

  console.log("🔧 UPDATE USER DETAILS - userId:", userId);
  console.log("🔧 UPDATE DATA:", UpdateData);

  const user = users.find((user) => user.id === userId);
  if (!user) {
    console.log("❌ User not found with ID:", userId);
    throw new Error("User not found");
  }

  console.log("📋 BEFORE UPDATE:", {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  });

  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.dateOfBirth = dateOfBirth;
  user.updatedAt = new Date().toISOString();

  console.log("📋 AFTER UPDATE:", {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  });

  console.log("🔍 CURRENT USERS ARRAY:");
  users.forEach((u) => {
    console.log(`  - ID: ${u.id}, Email: ${u.email}, Username: ${u.username}`);
  });

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

  console.log("✅ UPDATE COMPLETED, returning:", userResponse);
  return userResponse;
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
    dateOfBirth: user.dateOfBirth,
  };
  return userResponse;
};
export const isTokenBlacklisted = (token: string): boolean => {
  return blackListedToken.has(token);
};
