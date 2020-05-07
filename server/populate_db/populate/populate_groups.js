const { map } = require('lodash');
const logger = require('../../logger')(module);
const app = require('../../server');
const { getUserId, merge } = require('../utils');
const groupsData = require('../data/groups');

module.exports = async () => {
  const { Group } = app.models;

  logger.info('populate groups');

  const userId = await getUserId();

  const wrappedGroups = map(groupsData, group => merge(group, { createdBy: userId }));

  await Group.create(wrappedGroups);
};
