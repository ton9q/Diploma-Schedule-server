const { isString } = require('lodash');

module.exports = (subject, raise) => {
  const { name, cabinet, buildingNumber } = subject;

  if (!isString(name)) {
    raise('"name" must be a string');
  }

  if (!isString(cabinet)) {
    raise('"cabinet" must be a string');
  }

  if (!isString(buildingNumber)) {
    raise('"buildingNumber" must be a string');
  }
};
