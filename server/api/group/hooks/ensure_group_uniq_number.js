const { UnprocessableEntity } = require('http-errors');
const app = require('../../../server');

module.exports = async context => {
  const { groupName } = context.args.data;
  const id = context.ctorArgs && context.ctorArgs.id;
  const { Group } = app.models;

  const duplicatedGroup = await Group.findOne({
    where: {
      groupName,
      isArchived: false,
    },
  });

  if (duplicatedGroup) {
    if (!id || (id && duplicatedGroup.id.toString() !== id)) {
      throw new UnprocessableEntity('"groupName" for group should be uniq!');
    }
  }
};
