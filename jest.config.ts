export default {
  // Test ortamı
  testEnvironment: "jsdom",

  // Test dosyaları
  testMatch: [
    "**/__tests__/**/*.test.[jt]s?(x)",
    "**/--test--/**/*.test.[jt]s?(x)",
  ],

  // Setup dosyası
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup/jest.setup.ts"],

  // Module mapper
  moduleNameMapper: {
    // CSS/SCSS dosyaları için mock
    "\\.(css|less|scss|sass)$":
      "<rootDir>/src/__tests__/mocks/cssModuleMock.js",
    // SVG ve diğer dosyalar için mock
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/src/__tests__/mocks/fileMock.js",
    // Path alias'ları
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  // Coverage ayarları
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/main.tsx",
    "!src/vite-env.d.ts",
  ],

  // Transform ayarları
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.test.json",
      },
    ],
  },
};
