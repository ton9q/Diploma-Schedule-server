const { Forbidden } = require('http-errors');
const { isUniversityEditable } = require('../../../permissions/university');

module.exports = async context => {
  const userRoles = context.user.roles;

  if (!isUniversityEditable({ userRoles })) {
    throw new Forbidden('Forbidden to edit university');
  }
};
