import baseConfig from './jest.config';

module.exports = {
  ...baseConfig,
  rootDir: '../',
  testMatch: ['**/test/integration/**/*.test.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/test/integration/jest.setup.ts'],
};
