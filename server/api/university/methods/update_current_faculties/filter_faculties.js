const filterFields = require('../../../common/hooks/filter_fields');

module.exports = filterFields([
  'name',
  'specialties',
], {
  argumentName: 'faculties',
});
