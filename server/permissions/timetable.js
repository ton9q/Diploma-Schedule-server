const { ADMIN } = require('../../common/constants/user_roles');

const isTeacherEditable = ({ userRoles }) => {
  return userRoles.includes(ADMIN);
};

module.exports = {
  isTeacherEditable,
};
