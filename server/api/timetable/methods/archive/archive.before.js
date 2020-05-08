const { requireUser, setCurrentUserIdArg } = require('../../../common/hooks/auth');
const ensureTimetableIsEditable = require('../../hooks/ensure_timetable_is_editable');

module.exports = [
  requireUser,
  ensureTimetableIsEditable,
  setCurrentUserIdArg,
];
