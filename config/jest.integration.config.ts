import baseConfig from './jest.config';

module.exports = {
  ...baseConfig,
  rootDir: '../',
  testMatch: ['**/tests/integration/**/*.test.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/integration/jest.setup.ts'],
};
