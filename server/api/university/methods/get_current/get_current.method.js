const { NotFound } = require('http-errors');
const app = require('../../../../server');

module.exports = async () => {
  const { University } = app.models;

  const currentUniversity = await University.findOne();
  if (!currentUniversity) {
    throw new NotFound('Current University not found');
  }

  return currentUniversity;
};
