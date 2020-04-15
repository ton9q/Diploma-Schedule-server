const { initRemoteMethods, disableRemoteMethods } = require('../utils/models');

module.exports = University => {
  disableRemoteMethods(University);

  initRemoteMethods(University);
};
