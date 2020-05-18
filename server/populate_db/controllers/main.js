// script to populate DB with fake and initial data
// to adjust settings use file ./config.js
require('dotenv').config();
const logger = require('../../logger')(module);

logger.info('loading loopback app...');
require('../../server');

const config = require('../config');
const {
  populateUsers,
  populateGroups,
  populateTeachers,
  populateTimetables,
  populateUniversity,
} = require('../populate');

logger.info('generating data for DB...');

(async () => {
  const {
    users,
    groups,
    teachers,
    timetables,
    university,
  } = config;

  try {
    if (users) {
      await populateUsers(users);
    }
    if (groups) {
      await populateGroups();
    }
    if (teachers) {
      await populateTeachers();
    }
    if (university) {
      await populateUniversity();
    }
    if (timetables) {
      await populateTimetables();
    }
  } catch (err) {
    logger.error('Fake_data ERROR:', err);
  }

  process.exit(0);
})();
