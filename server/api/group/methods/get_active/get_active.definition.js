module.exports = {
  http: {
    path: '/active',
    verb: 'get',
  },
  accepts: [{
    arg: 'faculty',
    type: 'string',
    http: { source: 'query' },
    description: 'Faculty name',
  }, {
    arg: 'specialty',
    type: 'string',
    http: { source: 'query' },
    description: 'Specialty name',
  }],
  returns: {
    type: 'array',
    root: true,
  },
  description: 'Get active (not archived) groups',
};
