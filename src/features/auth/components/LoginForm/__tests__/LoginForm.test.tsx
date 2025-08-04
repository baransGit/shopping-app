import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginForm } from "..";

jest.mock("../../../api/authApi", () => ({
  authAPI: {
    login: jest.fn(),
  },
}));
