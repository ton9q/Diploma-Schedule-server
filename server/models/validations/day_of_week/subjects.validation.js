const { isArray } = require('lodash');

module.exports = (dayOfWeek, raise) => {
  const { subjects } = dayOfWeek;

  if (!isArray(subjects)) {
    raise('"subjects" must be an array');
  }

  if (subjects.length === 0) {
    raise('"subjects" must contain at least 1 item');
  }
};
