const { Forbidden } = require('http-errors');
const { isGroupEditable } = require('../../../permissions/group');

module.exports = async context => {
  const userRoles = context.user.roles;

  if (!isGroupEditable({ userRoles })) {
    throw new Forbidden('Forbidden to edit group');
  }
};
