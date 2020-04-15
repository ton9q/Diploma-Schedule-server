const HOOK_STATE_KEY = Symbol('hookState');

function getFromRemoteHookContext(context, key) {
  const hookState = context[HOOK_STATE_KEY] || {};
  return hookState[key];
}

function saveInRemoteHookContext(context, key, value) {
  context[HOOK_STATE_KEY] = context[HOOK_STATE_KEY] || {};
  context[HOOK_STATE_KEY][key] = value;
}

module.exports = {
  getFromRemoteHookContext,
  saveInRemoteHookContext,
};
