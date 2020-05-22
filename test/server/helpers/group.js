const { omit } = require('lodash');
const app = require('../../../server/server');
const { toPlainObject } = require('../utils/models');

const generateGroupName = (() => {
  let generatedGroupNames = 0;

  return () => {
    generatedGroupNames += 1;
    return `group_name_${generatedGroupNames}`;
  };
})();

const createGroupData = (fields = {}) => {
  return {
    groupName: fields.groupName || generateGroupName(),
    faculty: 'faculty',
    specialty: 'specialty',
    numberSemesters: 8,
    ...fields,
  };
};

const createGroup = async (fields = {}, { createdBy } = {}) => {
  const { Group } = app.models;

  const group = await Group.create({
    groupName: 'group_name',
    faculty: 'faculty',
    specialty: 'specialty',
    numberSemesters: 8,
    ...fields,
  }, { createdBy });

  return group;
};

const prepareGroupForComparing = group => {
  return omit(toPlainObject(group), [
    'id',
    'isArchived',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy',
  ]);
};

module.exports = {
  createGroupData,
  createGroup,
  prepareGroupForComparing,
};
