const { pick } = require('lodash');

module.exports = async currentUser => {
  const profile = pick(currentUser, [
    'id',
    'username',
    'roles',
    'email',
    'fullName',
  ]);

  return profile;
};
