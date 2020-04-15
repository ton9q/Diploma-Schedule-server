const { currentUserIdArg } = require('../../../common/definitions');

module.exports = {
  http: {
    path: '/current/faculties',
    verb: 'patch',
  },
  accepts: [
    {
      arg: 'faculties',
      type: 'array',
      http: {
        source: 'body',
      },
      required: true,
      description: 'Faculties data',
    },
    currentUserIdArg,
  ],
  returns: {
    type: 'object',
    root: true,
  },
  description: 'Update faculties for current University.',
};
