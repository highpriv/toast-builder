module.exports = {
  testEnvironment: "jsdom",

  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "preserve",
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
        },
      },
    ],
    "^.+\\.js$": "babel-jest",
  },

  moduleFileExtensions: ["js", "ts", "json", "vue"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@composables/(.*)$": "<rootDir>/src/composables/$1",
    "^@types/(.*)$": "<rootDir>/src/types/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@constants/(.*)$": "<rootDir>/src/constants/$1",
    "^@styles/(.*)$": "<rootDir>/src/styles/$1",
    "\\.(css|scss|sass)$": "<rootDir>/tests/__mocks__/styleMock.js",
  },

  testMatch: ["**/tests/**/*.spec.ts", "**/tests/**/*.test.ts"],

  collectCoverageFrom: [
    "src/**/*.{ts,vue}",
    "!src/main.ts",
    "!src/**/*.d.ts",
    "!src/types/**/*",
    "!src/assets/**/*",
  ],

  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],

  clearMocks: true,
  restoreMocks: true,

  verbose: true,
};
