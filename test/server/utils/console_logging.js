/* eslint no-console: 0 */

const mock = () => {};

const consoleBackup = {
  log: console.log,
  warn: console.warn,
  error: console.error,
};

const disableConsoleLogging = () => {
  console.log = mock;
  console.warn = mock;
  console.error = mock;
};

const enableConsoleLogging = () => {
  console.log = consoleBackup.log;
  console.warn = consoleBackup.warn;
  console.error = consoleBackup.error;
};

module.exports = {
  disableConsoleLogging,
  enableConsoleLogging,
};
