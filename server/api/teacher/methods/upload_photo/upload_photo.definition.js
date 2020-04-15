const { currentUserIdArg } = require('../../../common/definitions');

module.exports = {
  http: {
    path: '/uploadPhoto',
    verb: 'patch',
  },
  accepts: [
    {
      arg: 'context',
      type: 'object',
      http: { source: 'context' },
    },
    currentUserIdArg,
  ],
  returns: {
    type: 'object',
    root: true,
  },
  description: 'Upload teacher photo',
};
