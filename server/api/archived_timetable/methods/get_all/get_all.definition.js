module.exports = {
  http: {
    path: '/all',
    verb: 'get',
  },
  accepts: [{
    arg: 'group',
    type: 'string',
    http: { source: 'query' },
    description: 'Group name',
  },
  {
    arg: 'page',
    type: 'number',
    http: { source: 'query' },
    description: 'It is the page number',
  },
  {
    arg: 'pageSize',
    type: 'number',
    http: { source: 'query' },
    description: 'It is the number of records',
  }],
  returns: {
    type: 'array',
    root: true,
  },
  description: 'Get all archived timetables',
};
