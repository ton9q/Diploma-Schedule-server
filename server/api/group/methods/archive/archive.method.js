const { NotFound } = require('http-errors');
const app = require('../../../../server');

module.exports = async (groupId, currentUserIdArg) => {
  const { Group } = app.models;

  const group = await Group.findById(groupId);
  if (!group) {
    throw new NotFound(`Group with id="${groupId}" not found`);
  }

  return group.updateAttributes(
    { isArchived: true },
    { updatedBy: currentUserIdArg }
  );
};
