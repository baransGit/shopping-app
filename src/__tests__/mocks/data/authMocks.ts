import { mockUser } from "./userMocks";

export const mockAuthResponse = {
  register: {
    user: mockUser,
    token: "test-register-token",
    success: true,
  },
  login: {
    user: mockUser,
    token: "test-login-token",
    success: true,
  },
};
