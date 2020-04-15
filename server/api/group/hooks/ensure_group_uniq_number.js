const { find } = require('lodash');
const { Forbidden } = require('http-errors');
const app = require('../../../server');

module.exports = async context => {
  const { groupNumber } = context.args.data;
  const id = context.ctorArgs && context.ctorArgs.id;
  const { Group } = app.models;

  const groups = await Group.getActive();

  const duplicatedGroup = find(groups, { groupNumber });

  if (duplicatedGroup) {
    if (!id || (id && duplicatedGroup.id.toString() !== id)) {
      throw new Forbidden('"groupNumber" for group should be uniq!');
    }
  }
};
