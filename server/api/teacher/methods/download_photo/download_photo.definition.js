module.exports = {
  http: {
    path: '/:id/photo',
    verb: 'get',
  },
  accepts: [{
    arg: 'id',
    type: 'string',
    description: 'Teacher id',
  }, {
    arg: 'context',
    type: 'object',
    http: { source: 'context' },
  }],
  returns: {
    type: 'object',
    root: true,
  },
  description: 'Download teacher photo',
};
