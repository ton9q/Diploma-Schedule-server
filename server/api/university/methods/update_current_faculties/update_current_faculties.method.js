const app = require('../../../../server');

module.exports = async (faculties, currentUserId) => {
  const { University } = app.models;

  const currentUniversity = await University.getCurrent();

  return currentUniversity.updateAttributes({ faculties }, { updatedBy: currentUserId });
};
