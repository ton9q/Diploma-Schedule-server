const filterArgs = require('../../definitions/filter_args.definition');

module.exports = {
  http: {
    path: '/lessons',
    verb: 'get',
  },
  accepts: filterArgs,
  returns: {
    type: 'array',
    root: true,
  },
  description: 'Get timetables of lessons for group',
};
