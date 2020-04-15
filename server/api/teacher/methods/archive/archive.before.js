const { requireUser, setCurrentUserIdArg } = require('../../../common/hooks/auth');
const ensureTeacherIsEditable = require('../../hooks/ensure_teacher_is_editable');

module.exports = [
  requireUser,
  ensureTeacherIsEditable,
  setCurrentUserIdArg,
];
