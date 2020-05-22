const { isFunction } = require('lodash');

const destroyAll = (...models) => {
  return Promise.all(models.map(model => {
    return model.destroyAll();
  }));
};

const reload = modelInstance => {
  const Model = modelInstance.constructor;

  return Model.findById(modelInstance.id);
};

const toPlainObject = object => {
  const plainObject = isFunction(object.toJSON) ? object.toJSON() : object;

  return JSON.parse(JSON.stringify(plainObject));
};

module.exports = {
  destroyAll,
  reload,
  toPlainObject,
};
