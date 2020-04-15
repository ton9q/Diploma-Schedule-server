const app = require('../../../../server');

module.exports = async () => {
  const { Group } = app.models;

  const groups = await Group.find({
    where: {
      isArchived: false,
    },
    order: 'groupNumber ASC',
  });

  return groups;
};
