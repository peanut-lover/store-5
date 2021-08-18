module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setUpTests.ts'],
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'jest-transform-css',
    '\\.(jpg|png)$': '<rootDir>/empty-module.js',
  },
};
