const { requireUser } = require('../../../common/hooks/auth');
const ensureArchivedTimetablesAreViewable = require('./ensure_archived_timetables_are_viewable');
const validateQueryParams = require('./validate_query_params');

module.exports = [
  requireUser,
  ensureArchivedTimetablesAreViewable,
  validateQueryParams,
];
