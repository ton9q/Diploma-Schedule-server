const { pick } = require('lodash');

module.exports = allowedFields => async context => {
  context.args.data = pick(context.args.data, allowedFields);
};
