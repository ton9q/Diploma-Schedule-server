const determineUser = require('./determine_user');
const requireUser = require('./require_user');
const requireUserRole = require('./require_user_role');
const setCurrentUserArg = require('./set_current_user_arg');
const setCurrentUserIdArg = require('./set_current_user_id_arg');

module.exports = {
  determineUser,
  requireUser,
  requireUserRole,
  setCurrentUserArg,
  setCurrentUserIdArg,
};
