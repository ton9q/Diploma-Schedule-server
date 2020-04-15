const requireSuperAdmin = require('../../hooks/require_super_admin');
const filterFields = require('../../hooks/filter_fields');

module.exports = [
  requireSuperAdmin,
  filterFields({ allowPassword: true }),
];
