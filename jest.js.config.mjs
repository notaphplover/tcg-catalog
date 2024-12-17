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
      roots: ['<rootDir>/lib/cjs'],
      testEnvironment: 'node',
      testMatch: ['<rootDir>/lib/cjs/**/*.int.spec.js'],
      testPathIgnorePatterns: [],
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
      roots: ['<rootDir>/lib/cjs'],
      testEnvironment: 'node',
      testMatch: ['<rootDir>/lib/cjs/**/*.spec.js'],
      testPathIgnorePatterns: ['.int.spec.js'],
    },
  ],
};
