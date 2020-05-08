const { isString } = require('lodash');
const { LECTURE, PRACTICE, LABORATORY } = Object.values(require('../../../../common/constants/subject_lesson_types'));

const AVAILABLE_LESSON_TYPES = [LECTURE, PRACTICE, LABORATORY];

module.exports = (subject, raise) => {
  const { type, lessonStart, lessonEnd } = subject;

  if (!AVAILABLE_LESSON_TYPES.includes(type)) {
    return;
  }

  if (!isString(lessonStart)) {
    raise('"lessonStart" must be a string');
  }

  if (!isString(lessonEnd)) {
    raise('"lessonEnd" must be a string');
  }

  // TODO validate time
};
