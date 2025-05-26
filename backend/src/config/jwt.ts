import { SignJWT, jwtVerify, decodeJwt, errors } from "jose";
import { JwtPayload } from "../types";

// JWT Secret configuration for production environment
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-super-secret-key-change-in-production"
);
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "24h";

export const jwtConfig = {
  secret: JWT_SECRET,
  expiresIn: JWT_EXPIRATION,
  issuer: "shopping-app-backend",
  audience: "shopping-app-frontend",
} as const;

// Generate JWT token with user payload
export const generateToken = async (
  payload: Pick<JwtPayload, "userId" | "email">
): Promise<string> => {
  try {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setIssuer(jwtConfig.issuer)
      .setAudience(jwtConfig.audience)
      .setExpirationTime(jwtConfig.expiresIn)
      .sign(jwtConfig.secret);

    console.log(`New digital token created for user: ${payload.userId}`);
    return token;
  } catch (error) {
    console.error("Token creation error:", error);
    throw new Error("Token creation failed");
  }
};

// Verify JWT token and return payload
export const verifyToken = async (token: string): Promise<JwtPayload> => {
  try {
    const { payload } = await jwtVerify(token, jwtConfig.secret, {
      issuer: jwtConfig.issuer,
      audience: jwtConfig.audience,
    });

    console.log(`Token verified successfully for user: ${payload.userId}`);
    return payload as JwtPayload;
  } catch (error) {
    if (error instanceof errors.JWTExpired) {
      throw new Error("Token has expired");
    } else if (error instanceof errors.JWTInvalid) {
      throw new Error("Invalid token");
    } else {
      throw new Error("Token verification failed");
    }
  }
};

//Decode JWT token without verification

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    const decode = decodeJwt(token);
    return decode as JwtPayload;
  } catch (error) {
    console.error("Token decode error:", error);
    return null;
  }
};
// Security utility functions for token validation
export const tokenSecurityChecks = {
  // Check if token meets minimum security requirements
  isSecure: (token: string): boolean => {
    const decode = decodeToken(token);
    if (!decode) return false;
    // Validate issuer
    if (decode.iss !== jwtConfig.issuer) return false;
    if (decode.aud !== jwtConfig.audience) return false;

    return true;
  },

  getTokenAge: (token: string): number => {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.iat) return -1;
    const now = Math.floor(Date.now() / 1000);
    return now - decoded.iat;
  },
  getTimeToExpiry: (token: string): number => {
    const decoded = decodeToken(token);
  },
};
