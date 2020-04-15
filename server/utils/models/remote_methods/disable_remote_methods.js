module.exports = (Model, { except = [] } = {}) => {
  const methods = Model.sharedClass.methods();
  const methodsToDisable = methods.filter(method => !except.includes(method.name));

  methodsToDisable.forEach(method => {
    Model.disableRemoteMethodByName(getMethodName(method));
  });
};

function getMethodName(method) {
  const prefix = method.isStatic ? '' : 'prototype.';
  return `${prefix}${method.name}`;
}
