const { isNumber } = require('lodash');
const arrayString = require('../../../utils/array_string');
const DAY_OF_WEEK_NUMBERS = Object.keys(require('../../../../common/constants/day_of_week_numbers'));

module.exports = (dayOfWeek, raise) => {
  const { numberDayOfWeek } = dayOfWeek;

  if (!isNumber(numberDayOfWeek)) {
    raise('"numberDayOfWeek" must be a number');
  }

  if (!DAY_OF_WEEK_NUMBERS.includes(numberDayOfWeek)) {
    raise(
      `Invalid "numberDayOfWeek" = "${numberDayOfWeek}"; ` +
      `allowed: ${arrayString(DAY_OF_WEEK_NUMBERS)}`
    );
  }
};
