
const { times } = require('lodash');
const logger = require('../../logger')(module);
const app = require('../../server');
const { getRandomUserData, getSuperAdminUserData } = require('../generate');

module.exports = async ({ count = 1, createSuperAdmin } = {}) => {
  const { user: User } = app.models;

  if (createSuperAdmin) {
    await User.create(getSuperAdminUserData());
  }

  logger.info('generating users...');

  const usersData = times(count, getRandomUserData);

  await User.create(usersData);
};
