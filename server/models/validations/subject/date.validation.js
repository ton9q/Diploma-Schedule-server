const { isString } = require('lodash');
const { EXAM, CONSULTATION } = Object.values(require('../../../../common/constants/subject_lesson_types'));

const AVAILABLE_LESSON_TYPES = [EXAM, CONSULTATION];

module.exports = (subject, raise) => {
  const { type, date } = subject;

  if (!AVAILABLE_LESSON_TYPES.includes(type)) {
    return;
  }

  if (!isString(date)) {
    raise('"date" must be a string');
  }

  // TODO validate date
};
