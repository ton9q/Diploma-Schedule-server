const { isEmpty, isString } = require('lodash');
const arrayString = require('../../../utils/array_string');
const PARTS_OF_GROUP = Object.values(require('../../../../common/constants/subject_parts_of_group'));

module.exports = (subject, raise) => {
  const { partOfGroup } = subject;

  if (isEmpty(partOfGroup)) {
    return;
  }

  if (!isString(partOfGroup)) {
    raise('"partOfGroup" must be a string');
  }

  if (!PARTS_OF_GROUP.includes(partOfGroup)) {
    raise(`Invalid "partOfGroup" = "${partOfGroup}";  allowed: ${arrayString(PARTS_OF_GROUP)}`);
  }
};
