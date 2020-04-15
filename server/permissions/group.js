const { ADMIN } = require('../../common/constants/user_roles');

const isGroupEditable = ({ userRoles }) => {
  return userRoles.includes(ADMIN);
};

module.exports = {
  isGroupEditable,
};
