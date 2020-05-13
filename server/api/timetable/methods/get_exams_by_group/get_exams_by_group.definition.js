const filterArgs = require('../../definitions/filter_args.definition');

module.exports = {
  http: {
    path: '/exams',
    verb: 'get',
  },
  accepts: filterArgs,
  returns: {
    type: 'array',
    root: true,
  },
  description: 'Get timetables of consultations and exams for group',
};
