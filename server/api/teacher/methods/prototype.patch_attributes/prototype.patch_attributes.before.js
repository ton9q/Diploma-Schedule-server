const { requireUser } = require('../../../common/hooks/auth');
const ensureTeacherIsEditable = require('../../hooks/ensure_teacher_is_editable');
const ensureTeacherUniqFullName = require('../../hooks/ensure_teacher_uniq_full_name');
const filterFields = require('../../hooks/filter_fields');

module.exports = [
  requireUser,
  ensureTeacherIsEditable,
  ensureTeacherUniqFullName,
  filterFields,
];
