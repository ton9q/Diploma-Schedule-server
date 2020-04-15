const { castArray, intersection } = require('lodash');
const { Forbidden } = require('http-errors');
const requireUser = require('./require_user');

module.exports = requiredRoleOrRoles => async context => {
  await requireUser(context);

  const requiredRoles = castArray(requiredRoleOrRoles);
  const userRoles = context.user.roles;

  if (intersection(requiredRoles, userRoles).length === 0) {
    throw new Forbidden();
  }
};
