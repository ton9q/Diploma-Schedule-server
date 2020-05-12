const { NotFound } = require('http-errors');
const app = require('../../../../server');

module.exports = async context => {
  const { Group } = app.models;
  const { groupName } = context.args;

  const group = await Group.findOne({ where: { groupName, isArchived: false } });

  if (!group) {
    throw new NotFound(`Group with name="${groupName}" not found`);
  }
};
