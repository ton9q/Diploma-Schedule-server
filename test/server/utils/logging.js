const serverLogger = require('../../../server/logger');
const { disableConsoleLogging, enableConsoleLogging } = require('./console_logging');

const disableLogging = () => {
  disableConsoleLogging();
  serverLogger.disableAllLoggers();
};

const enableLogging = () => {
  enableConsoleLogging();
  serverLogger.enableAllLoggers();
};

module.exports = {
  disableLogging,
  enableLogging,
};
