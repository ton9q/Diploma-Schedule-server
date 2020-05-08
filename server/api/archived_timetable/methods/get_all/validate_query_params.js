const { isUndefined } = require('lodash');
const { UnprocessableEntity } = require('http-errors');

module.exports = async context => {
  const { page, pageSize } = context.args;

  if ((!isUndefined(page) && isUndefined(pageSize)) || (isUndefined(page) && !isUndefined(pageSize))) {
    raise('if one of the query params ["page", "pageSize"] is defined so each param must be defined');
  }

  if (!isUndefined(page) && page <= 0) {
    raise('"page" must be positive');
  }

  if (!isUndefined(pageSize) && pageSize <= 0) {
    raise('"pageSize" must be positive');
  }
};

function raise(message) {
  throw new UnprocessableEntity(`Invalid query param: ${message}`);
}
