module.exports = [
  {
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
  },
];
