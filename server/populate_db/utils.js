const { map, sum } = require('lodash');
const faker = require('faker');
const app = require('../server');

exports.probability = percentage => percentage > Math.random() * 100;

exports.randomObjectKey = objectWithValuesProbability => {
  const probabilitySum = sum(Object.values(objectWithValuesProbability));
  const random = faker.random.number({ min: 0, max: probabilitySum });
  let currentSum = 0;

  const selectedObjectAsArray = Object.entries(objectWithValuesProbability).find(([, probability]) => {
    currentSum += probability;
    return random <= currentSum;
  });

  return selectedObjectAsArray[0];
};

exports.getUsers = async (roles = []) => {
  const { user: User } = app.models;
  const where = {};

  if (roles.length) {
    where.roles = { $all: roles };
  }

  const users = await User.find({ where });
  if (users.length === 0) {
    throw new Error(`Users with roles ${roles} not found`);
  }

  return users;
};

exports.getUserIds = async (...params) => {
  const users = await exports.getUsers(...params);
  return map(users, 'id');
};

exports.getUserId = async (...params) => {
  const userIds = await exports.getUserIds(...params);
  return faker.random.arrayElement(userIds);
};

exports.merge = (object, { createdBy, updatedBy, ...overrides } = {}) => {
  const result = { ...object };
  const dateNow = new Date();

  if (createdBy) {
    result.createdBy = createdBy;
    result.createdAt = dateNow;
    result.updatedBy = createdBy;
    result.updatedAt = dateNow;
  }

  if (updatedBy) {
    result.updatedBy = updatedBy;
    result.updatedAt = dateNow;
  }

  Object.assign(result, overrides);

  return result;
};

exports.randomArrayElements = (array, elementCount = faker.random.number({ min: 1, max: array.length - 1 })) => {
  if (elementCount > array.length) {
    throw new Error('elementCount is more than array size');
  }

  const selectedElements = [];
  const remainingElements = [...array];

  while (selectedElements.length < elementCount) {
    const index = faker.random.number(remainingElements.length - 1);

    selectedElements.push(remainingElements[index]);
    remainingElements.splice(index, 1);
  }

  return selectedElements;
};
