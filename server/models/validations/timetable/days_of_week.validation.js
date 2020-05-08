const { isArray } = require('lodash');

module.exports = (timetable, raise) => {
  const { daysOfWeek } = timetable;

  if (!isArray(daysOfWeek)) {
    raise('"daysOfWeek" must be an array');
  }

  if (daysOfWeek.length === 0) {
    raise('"daysOfWeek" must contain at least 1 item');
  }
};
