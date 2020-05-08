const { Forbidden } = require('http-errors');
const { isTimetableEditable } = require('../../../permissions/timetable');

module.exports = async context => {
  const userRoles = context.user.roles;

  if (!isTimetableEditable({ userRoles })) {
    throw new Forbidden('Forbidden to edit timetable');
  }
};
