const appRootPath = require('app-root-path');

const serverTestsRootPath = `${appRootPath}/test/server`;

module.exports = {
  collectCoverage: process.argv.includes('--coverage'),
  collectCoverageFrom: [
    'server/**/*.js',
  ],
  coverageDirectory: `${serverTestsRootPath}/coverage`,
  globalSetup: `${serverTestsRootPath}/jest.setup.js`,
  rootDir: `${appRootPath}`,
  setupFilesAfterEnv: [
    `${serverTestsRootPath}/jest.before_each.js`,
  ],
  testEnvironment: 'node',
  testRegex: 'test/server/tests/.*\\.test\\.js$',
  transform: {
    '.*\\.js$': `${serverTestsRootPath}/preprocessor.js`,
  },
  transformIgnorePatterns: [
    'node_modules/(?!loopback-boot)',
  ],
};
