const { get } = require('lodash');
const { disableRelationRemoteMethods } = require('../utils/models');

module.exports = (Model, { required = true } = {}) => {
  const ObjectId = Model.getDataSource().connector.getDefaultIdType();

  Model.defineProperty('createdBy', {
    type: ObjectId,
    required,
  });

  Model.defineProperty('createdAt', {
    type: Date,
    required,
  });

  Model.defineProperty('updatedBy', {
    type: ObjectId,
    required,
  });

  Model.defineProperty('updatedAt', {
    type: Date,
    required,
  });

  Model.dataSource.defineRelations(Model, {
    creator: {
      type: 'belongsTo',
      model: 'user',
      foreignKey: 'createdBy',
    },
    updater: {
      type: 'belongsTo',
      model: 'user',
      foreignKey: 'updatedBy',
    },
  });

  disableRelationRemoteMethods(Model, 'creator');
  disableRelationRemoteMethods(Model, 'updater');

  Model.observe('before save', async ({ instance, data, isNewInstance, options = {} }) => {
    const dataObject = instance || data;
    if (!dataObject) {
      return;
    }

    const accessTokenUserId = get(options, 'accessToken.userId');
    const createdBy = options.createdBy || accessTokenUserId;
    const updatedBy = options.updatedBy || accessTokenUserId;
    const now = new Date();

    if (isNewInstance && createdBy) {
      dataObject.createdBy = createdBy;
      dataObject.createdAt = now;
      dataObject.updatedBy = createdBy;
      dataObject.updatedAt = now;

    } else if (!isNewInstance && updatedBy) {
      dataObject.updatedBy = updatedBy;
      dataObject.updatedAt = now;
    }
  });
};
