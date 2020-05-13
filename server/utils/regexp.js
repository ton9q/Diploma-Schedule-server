const { escapeRegExp } = require('lodash');

function getRegExp(string, { exactMatch = true, caseSensitive = true } = {}) {
  let escapedString = escapeRegExp(string);
  let flags = '';

  if (exactMatch) {
    escapedString = `^${escapedString}$`;
  }

  if (!caseSensitive) {
    flags += 'i';
  }

  return new RegExp(escapedString, flags);
}

module.exports = {
  getRegExp,
};
