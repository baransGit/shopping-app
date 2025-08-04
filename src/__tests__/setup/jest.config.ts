export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup/jest.setup.ts"],
  moduleNameMapper: {
    "\\.module\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(css|less|scss|sass)$": "<rootDir>/src/__tests__/mocks/styleMock.js",
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/src/__tests__/mocks/fileMock.js",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/main.tsx",
    "!src/vite-env.d.ts",
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
