import baseConfig from './jest.config';

module.exports = {
  ...baseConfig,
  rootDir: '../',
  testMatch: ['**/**/__tests__/**/*.test.ts'],
};
