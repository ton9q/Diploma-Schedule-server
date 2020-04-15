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
      description: 'Group id',
    },
    currentUserIdArg,
  ],
  returns: {
    type: 'object',
    root: true,
  },
  description: 'Mark group as archived',
};
