const { isString } = require('lodash');
const arrayString = require('../../../utils/array_string');
const DAY_OF_WEEK_NAMES = Object.values(require('../../../../common/constants/day_of_week_names'));

module.exports = (dayOfWeek, raise) => {
  const { dayOfWeekName } = dayOfWeek;

  if (!isString(dayOfWeekName)) {
    raise('"dayOfWeekName" must be a string');
  }

  if (!DAY_OF_WEEK_NAMES.includes(dayOfWeekName)) {
    raise(`Invalid "dayOfWeekName" = "${dayOfWeekName}";  allowed: ${arrayString(DAY_OF_WEEK_NAMES)}`);
  }
};
