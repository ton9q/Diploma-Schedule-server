const { NotFound } = require('http-errors');
const { pick } = require('lodash');
const app = require('../../../../server');

module.exports = async userId => {
  const { user: User } = app.models;

  const user = await User.findById(userId);
  if (!user) {
    throw new NotFound(`User id="${userId} not found"`);
  }

  const profile = pick(user, [
    'id',
    'username',
    'roles',
    'email',
    'fullName',
  ]);

  return profile;
};
