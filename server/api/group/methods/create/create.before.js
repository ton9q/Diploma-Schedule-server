const { requireUser } = require('../../../common/hooks/auth');
const ensureGroupIsEditable = require('../../hooks/ensure_group_is_editable');
const validateGroupArguments = require('../../hooks/validate_group_arguments');
const ensureGroupUniqNumber = require('../../hooks/ensure_group_uniq_number');
const filterFields = require('../../hooks/filter_fields');

module.exports = [
  requireUser,
  ensureGroupIsEditable,
  validateGroupArguments,
  ensureGroupUniqNumber,
  filterFields,
];
