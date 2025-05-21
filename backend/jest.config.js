module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'utils/**/*.js',
    'routes/**/*.js',
    '!**/*.test.js',
    '!**/node_modules/**'
  ],
  coverageReporters: ['text', 'lcov', 'clover'],
  verbose: true,
}; 