const {
  initRemoteMethods,
  disableRemoteMethods,
  disableRelationRemoteMethods,
} = require('../utils/models');

module.exports = User => {
  disableRemoteMethods(User, {
    except: [
      'find',
      'create',
      'login',
      'logout',
      'patchAttributes',
    ],
  });

  disableRelationRemoteMethods(User, 'accessTokens');

  initRemoteMethods(User);
};
