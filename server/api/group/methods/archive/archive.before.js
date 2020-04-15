const { requireUser, setCurrentUserIdArg } = require('../../../common/hooks/auth');
const ensureGroupIsEditable = require('../../hooks/ensure_group_is_editable');

module.exports = [
  requireUser,
  ensureGroupIsEditable,
  setCurrentUserIdArg,
];
