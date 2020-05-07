const { find } = require('lodash');
const { Forbidden } = require('http-errors');
const app = require('../../../server');

module.exports = async context => {
  const { groupName } = context.args.data;
  const id = context.ctorArgs && context.ctorArgs.id;
  const { Group } = app.models;

  const groups = await Group.getActive();

  const duplicatedGroup = find(groups, { groupName });

  if (duplicatedGroup) {
    if (!id || (id && duplicatedGroup.id.toString() !== id)) {
      throw new Forbidden('"groupName" for group should be uniq!');
    }
  }
};
