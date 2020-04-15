const { ADMIN } = require('../../common/constants/user_roles');

const isUniversityEditable = ({ userRoles }) => {
  return userRoles.includes(ADMIN);
};

module.exports = {
  isUniversityEditable,
};
