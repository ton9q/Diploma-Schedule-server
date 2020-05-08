const { isEmpty, isString } = require('lodash');
const arrayString = require('../../../utils/array_string');
const WEEK_NUMBERS = Object.values(require('../../../../common/constants/subject_week_numbers'));

module.exports = (subject, raise) => {
  const { weekNumber } = subject;

  if (isEmpty(weekNumber)) {
    return;
  }

  if (!isString(weekNumber)) {
    raise('"weekNumber" must be a string');
  }

  if (!WEEK_NUMBERS.includes(weekNumber)) {
    raise(`Invalid "weekNumber" = "${weekNumber}";  allowed: ${arrayString(WEEK_NUMBERS)}`);
  }
};
