const determineUser = require('./determine_user');

module.exports = async context => {
  await determineUser(context);

  context.args.currentUser = context.user;
};
