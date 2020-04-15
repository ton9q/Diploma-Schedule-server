const { CREATOR, ADMIN, SUPER_ADMIN } = require('../constants/user_roles');

function getUserRoleLabel(userRole) {
  switch (userRole) {
    case CREATOR:
      return 'Creator';

    case ADMIN:
      return 'Administrator';

    case SUPER_ADMIN:
      return 'Super Administrator';

    default:
      return userRole;
  }
}

module.exports = {
  getUserRoleLabel,
};
