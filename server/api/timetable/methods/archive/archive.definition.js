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
      description: 'Timetable id',
    },
    currentUserIdArg,
  ],
  returns: {
    type: 'object',
    root: true,
  },
  description: 'Move the opportunity to an archive',
};
