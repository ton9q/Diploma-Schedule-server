module.exports = {
  http: {
    path: '/:id',
    verb: 'get',
  },
  accepts: [
    {
      arg: 'id',
      type: 'string',
      description: 'User id',
    },
  ],
  returns: {
    type: 'object',
    root: true,
  },
  description: 'Get user profile by id',
};
