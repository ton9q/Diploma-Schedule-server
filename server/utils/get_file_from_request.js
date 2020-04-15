const { get } = require('lodash');

module.exports = ({ files, fileNumber = 1 }) => {
  return get(files, `file${fileNumber === 1 ? '' : fileNumber}[0]`);
};
