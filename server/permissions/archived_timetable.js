const { ADMIN } = require('../../common/constants/user_roles');

const areArchivedTimetablesViewable = ({ userRoles }) => {
  return userRoles.includes(ADMIN);
};

module.exports = {
  areArchivedTimetablesViewable,
};
