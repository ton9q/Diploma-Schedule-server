const { initRemoteMethods, disableRemoteMethods } = require('../utils/models');

module.exports = Group => {
  disableRemoteMethods(Group, {
    except: [
      'create',
      'patchAttributes',
    ],
  });

  initRemoteMethods(Group);
};
