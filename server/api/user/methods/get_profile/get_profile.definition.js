const { currentUserArg } = require('../../../common/definitions');

module.exports = {
  http: {
    path: '/profile',
    verb: 'get',
  },
  accepts: [
    currentUserArg,
  ],
  returns: {
    type: 'object',
    root: true,
  },
  description: 'Get user profile',
};
