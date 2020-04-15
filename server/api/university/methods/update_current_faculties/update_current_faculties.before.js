const { requireUser, setCurrentUserIdArg } = require('../../../common/hooks/auth');
const ensureUniversityIsEditable = require('../../hooks/ensure_university_is_editable');
const filterFaculties = require('./filter_faculties');
const validateFaculties = require('./validate_faculties');
const sortFaculties = require('./sort_faculties');

module.exports = [
  requireUser,
  ensureUniversityIsEditable,
  filterFaculties,
  validateFaculties,
  sortFaculties,
  setCurrentUserIdArg,
];
