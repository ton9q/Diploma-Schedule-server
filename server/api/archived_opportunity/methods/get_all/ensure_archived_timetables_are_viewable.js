const { Forbidden } = require('http-errors');
const { areArchivedTimetablesViewable } = require('../../../../permissions/archived_timetable');

module.exports = async context => {
  const userRoles = context.user.roles;

  if (!areArchivedTimetablesViewable({ userRoles })) {
    throw new Forbidden('Forbidden to get archived timetables');
  }
};
