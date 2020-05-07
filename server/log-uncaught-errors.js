const logger = require('./logger')(module, { label: 'App' });

module.exports = () => {
  process.on('uncaughtException', err => {
    logger.error(`[Uncaught Exception] ${err.name}: ${err.message}`);
    logger.info('Shutting down...', () => {
      process.exitCode = 1;
    });
  });

  process.on('unhandledRejection', reason => {
    logger.error(`[Unhandled Rejection] ${reason}`);
    logger.info('Shutting down...', () => {
      process.exitCode = 1;
    });
  });
};
