module.exports = {
  http: {
    path: '/all',
    verb: 'get',
  },
  accepts: [{
    arg: 'groupName',
    type: 'string',
    http: { source: 'query' },
    required: true,
    description: 'Group name',
  }, {
    arg: 'date',
    type: 'date',
    http: { source: 'query' },
    description: 'Date for defining the semester for filtering timetables',
  }],
  returns: {
    type: 'array',
    root: true,
  },
  description: 'Get all group timetables',
};
