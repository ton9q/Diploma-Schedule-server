const { initRemoteMethods, disableRemoteMethods } = require('../utils/models');

module.exports = Teacher => {
  disableRemoteMethods(Teacher, {
    except: [
      'create',
      'patchAttributes',
    ],
  });

  initRemoteMethods(Teacher);
};
