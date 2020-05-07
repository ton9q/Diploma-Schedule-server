require('dotenv').config();
const loopback = require('loopback');
const boot = require('loopback-boot');
const compression = require('compression');
const logger = require('./logger')(module);
const logUncaughtErrors = require('./log-uncaught-errors');

logUncaughtErrors();

const app = loopback();
app.use(compression());

app.start = () => {
  const host = app.get('host');
  const port = app.get('port') || 3000;
  const url = app.get('url');

  return app.listen(port, host, () => {
    app.emit('started');

    const baseUrl = url.replace(/\/$/, '');
    logger.info(`Web server listening at: ${baseUrl}`);

    const explorer = app.get('loopback-component-explorer');
    if (explorer) {
      logger.info(`Browse your REST API at ${url}${explorer.mountPath}`);
    }
  });
};

app.enable('trust proxy');

module.exports = app;

boot(app, __dirname, err => {
  if (err) {
    throw err;
  }

  if (require.main === module) {
    app.start();
  }
});
