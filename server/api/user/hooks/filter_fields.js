const filterFields = require('../../common/hooks/filter_fields');

module.exports = ({ allowPassword }) => {
  const allowedFields = [
    'fullName',
    'email',
    'roles',
  ];

  if (allowPassword) {
    allowedFields.push('password');
  }

  return filterFields(allowedFields);
};
