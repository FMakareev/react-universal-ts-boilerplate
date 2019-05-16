
process.env.NODE_ENV = 'test';

module.exports = {
  preset: 'ts-jest',
  // testEnvironment: 'node',
  cacheDirectory: '.cache/jest',
  clearMocks: true,
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/styleMock.js',
  },
  roots: [
    '<rootDir>/stories',
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'tsx', 'jsx', 'json'],
};
