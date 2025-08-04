import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import "../mocks/utils/localStorage.mock";
import { mockAuthApi } from "../mocks/api/authApi.mock";
import { mockNavigation } from "../mocks/hooks/navigation.mock";
import { mockCategoryApi } from "../mocks/api/categoryApi.mock";
import { mockProductApi } from "../mocks/api/productApi.mock";

// TextEncoder polyfill - simple
window.TextEncoder = jest.fn().mockImplementation(() => ({
  encode: jest.fn((input) => new Uint8Array(input.length)),
}));

window.TextDecoder = jest.fn().mockImplementation(() => ({
  decode: jest.fn(() => ""),
}));

// Global test setup
beforeAll(() => {
  // Mock window.matchMedia
  Object.defineProperty(window, "matchMedia", {
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })),
  });

  // Mock localStorage
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
  });
});

jest.mock("../../features/auth/api/authApi", () => ({
  authAPI: mockAuthApi,
}));

jest.mock("../../shared/hooks/useNavigation", () => ({
  useNavigation: () => mockNavigation,
}));

jest.mock("../../features/category/api/categoryApi", () => ({
  categoryAPI: mockCategoryApi,
}));

jest.mock("../../features/product/api/productApi", () => ({
  productAPI: mockProductApi,
}));

// Global test cleanup
afterEach(() => {
  cleanup();
  jest.clearAllMocks();
  localStorage.clear();
});
