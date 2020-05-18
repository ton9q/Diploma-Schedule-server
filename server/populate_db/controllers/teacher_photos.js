// before running scripts you should update access_token in .env for sending request

require('dotenv').config();
const logger = require('../../logger')(module);

logger.info('loading loopback app...');
require('../../server');

const { addPhotosToTeachers } = require('../populate');

(async () => {
  try {
    await addPhotosToTeachers();
  } catch (err) {
    logger.error('Fake_data ERROR:', err);
  }

  process.exit(0);
})();
