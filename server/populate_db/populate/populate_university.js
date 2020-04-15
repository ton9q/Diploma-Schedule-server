const logger = require('../../logger')(module);
const app = require('../../server');
const { getUserId, merge } = require('../utils');
const universityData = require('../data/university');

module.exports = async () => {
  const { University } = app.models;

  logger.info('populate university');

  const userId = await getUserId();

  await University.create(
    merge(
      universityData,
      { createdBy: userId }
    )
  );
};
