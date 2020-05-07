const { map } = require('lodash');
const logger = require('../../logger')(module);
const app = require('../../server');
const { getUserId, merge } = require('../utils');
const teachersData = require('../data/teachers');

module.exports = async () => {
  const { Teacher } = app.models;

  logger.info('populate teachers');

  const userId = await getUserId();

  const wrappedTeachers = map(teachersData, teacher => merge(teacher, { createdBy: userId }));

  await Teacher.create(wrappedTeachers);
};
