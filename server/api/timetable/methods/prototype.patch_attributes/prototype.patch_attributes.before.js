const { requireUser } = require('../../../common/hooks/auth');
const ensureTimetableIsEditable = require('../../hooks/ensure_timetable_is_editable');
const validateTimetableArguments = require('../../hooks/validate_timetable_arguments');
const filterFields = require('../../hooks/filter_fields');

module.exports = [
  requireUser,
  ensureTimetableIsEditable,
  validateTimetableArguments,
  filterFields,
];
