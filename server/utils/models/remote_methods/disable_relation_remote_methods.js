const { without } = require('lodash');

const RELATION_METHOD_NAMES = [
  'findById',
  'destroyById',
  'updateById',
  'exists',
  'link',
  'get',
  'create',
  'update',
  'destroy',
  'unlink',
  'count',
  'delete',
];

module.exports = (Model, relationName, { except = [] } = {}) => {
  const methodNamesToDisable = without(RELATION_METHOD_NAMES, ...except);

  methodNamesToDisable.forEach(methodName => {
    Model.disableRemoteMethodByName(getFullMethodName(methodName, relationName));
  });
};

function getFullMethodName(methodName, relationName) {
  return `prototype.__${methodName}__${relationName}`;
}
