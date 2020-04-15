// script to populate DB with fake data
// to generate data run this file with node.js `node server/fake_data/CustomMultipleSelect.jsx`
// to adjust settings use file ./config.js
require('dotenv').config();
const logger = require('../logger')(module);

logger.info('loading loopback app...');
require('../server');

const config = require('./config');
const {
  populateUsers,
  populateUniversity,
} = require('./populate');

logger.info('generating data for DB...');

(async () => {
  const {
    users,
    university,
  } = config;

  try {
    // if (users) {
    //   await populateUsers(users);
    // }
    if (university) {
      await populateUniversity();
    }
  } catch (err) {
    logger.error('Fake_data ERROR:', err);
  }

  process.exit(0);
})();
