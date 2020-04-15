const disableRemoteMethods = require('./remote_methods/disable_remote_methods');
const disableRelationRemoteMethods = require('./remote_methods/disable_relation_remote_methods');
const initRemoteMethods = require('./remote_methods/init_remote_methods');
const initValidations = require('./validation/init_validations');
const initOperationHooks = require('./operation_hooks/init_operation_hooks');
const { getFromRemoteHookContext, saveInRemoteHookContext } = require('./remote_hook_state');

module.exports = {
  disableRemoteMethods,
  disableRelationRemoteMethods,
  initRemoteMethods,
  initValidations,
  initOperationHooks,
  getFromRemoteHookContext,
  saveInRemoteHookContext,
};
