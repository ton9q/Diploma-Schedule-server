const { currentUserIdArg } = require('../../../common/definitions');

module.exports = {
  http: {
    path: '/:id/archive',
    verb: 'post',
  },
  accepts: [
    {
      arg: 'id',
      type: 'string',
      description: 'Teacher id',
    },
    currentUserIdArg,
  ],
  returns: {
    type: 'object',
    root: true,
  },
  description: 'Mark teacher as archived',
};
