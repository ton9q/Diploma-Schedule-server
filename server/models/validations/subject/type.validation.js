const { isString } = require('lodash');
const arrayString = require('../../../utils/array_string');
const LESSON_TYPES = Object.values(require('../../../../common/constants/subject_lesson_types'));

module.exports = (subject, raise) => {
  const { type } = subject;

  if (!isString(type)) {
    raise('"type" must be a string');
  }

  if (!LESSON_TYPES.includes(type)) {
    raise(`Invalid "type" = "${type}";  allowed: ${arrayString(LESSON_TYPES)}`);
  }
};
