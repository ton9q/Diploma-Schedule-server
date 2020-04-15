const { Unauthorized } = require('http-errors');
const determineUser = require('./determine_user');

module.exports = async context => {
  await determineUser(context);

  if (!context.user) {
    throw new Unauthorized();
  }
};
