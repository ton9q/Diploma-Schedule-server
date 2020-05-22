const { disableLogging, enableLogging } = require('./logging');

module.exports = function (...args) {
  beforeAll(disableLogging);

  const describeCallResult = describe.apply(this, args);

  afterAll(enableLogging);

  return describeCallResult;
};
