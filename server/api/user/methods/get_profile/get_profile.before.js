const { requireUser, setCurrentUserArg } = require('../../../common/hooks/auth');

module.exports = [
  requireUser,
  setCurrentUserArg,
];
