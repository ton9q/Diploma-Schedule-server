const createLogger = require('./create_logger');

const loggers = [];

const createAndSaveLogger = (...args) => {
  const logger = createLogger(...args);
  loggers.push(logger);

  return logger;
};

const disableAllLoggers = () => {
  loggers.forEach(({ transports }) => {
    transports.forEach(transport => {
      transport.silent = true;
    });
  });
};

const enableAllLoggers = () => {
  loggers.forEach(({ transports }) => {
    transports.forEach(transport => {
      transport.silent = false;
    });
  });
};

module.exports = Object.assign(createAndSaveLogger, {
  disableAllLoggers,
  enableAllLoggers,
});
