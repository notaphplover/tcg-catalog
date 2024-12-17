/** @type {!import("@jest/types").Config.InitialOptions} */
export default {
  passWithNoTests: true,
  projects: [
    {
      coveragePathIgnorePatterns: ['/fixtures/', '/node_modules/'],
      coverageThreshold: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70,
        },
      },
      displayName: 'Integration',
      moduleFileExtensions: ['ts', 'js', 'json'],
      rootDir: '.',
      roots: ['<rootDir>/src'],
      testEnvironment: 'node',
      testMatch: ['<rootDir>/src/**/*.int.spec.ts'],
      testPathIgnorePatterns: [],
      transform: {
        '^.+\\.ts?$': 'ts-jest',
      },
    },
    {
      coveragePathIgnorePatterns: ['/fixtures/', '/node_modules/'],
      coverageThreshold: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70,
        },
      },
      displayName: 'Unit',
      moduleFileExtensions: ['ts', 'js', 'json'],
      rootDir: '.',
      roots: ['<rootDir>/src'],
      testEnvironment: 'node',
      testMatch: ['<rootDir>/src/**/*.spec.ts'],
      testPathIgnorePatterns: ['.int.spec.ts'],
      transform: {
        '^.+\\.ts?$': 'ts-jest',
      },
    },
  ],
};
