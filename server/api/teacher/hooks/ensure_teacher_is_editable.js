const { Forbidden } = require('http-errors');
const { isTeacherEditable } = require('../../../permissions/teacher');

module.exports = async context => {
  const userRoles = context.user.roles;

  if (!isTeacherEditable({ userRoles })) {
    throw new Forbidden('Forbidden to edit teacher');
  }
};
