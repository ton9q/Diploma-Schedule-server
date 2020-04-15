const faker = require('faker');
const { CREATOR, ADMIN, SUPER_ADMIN } = require('../../../common/constants/user_roles');
const { probability } = require('../utils');

function generateRoles() {
  if (probability(30)) {
    return [ADMIN];
  }

  return [CREATOR];
}

function getRandomUserData() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const countryCode = faker.address.countryCode().toLowerCase();
  const email = `${firstName}.${lastName}@example.net`;

  return {
    username: `${countryCode}.${email}`,
    password: faker.internet.password(),
    roles: generateRoles(),
    email,
    fullName: `${firstName} ${lastName}`,
    isGeneratedUser: true,
  };
}

function getSuperAdminUserData() {
  const { SUPER_ADMIN_USERNAME, SUPER_ADMIN_PASSWORD } = process.env;
  if (!SUPER_ADMIN_USERNAME) {
    throw new Error("Env var SUPER_ADMIN_USERNAME isn't not set");
  }
  if (!SUPER_ADMIN_PASSWORD) {
    throw new Error("Env var SUPER_ADMIN_PASSWORD isn't not set");
  }

  return {
    username: SUPER_ADMIN_USERNAME,
    password: SUPER_ADMIN_PASSWORD,
    roles: [SUPER_ADMIN, ADMIN],
    email: 'SuperAdmin@local',
    fullName: 'Super Admin',
    isGeneratedUser: true,
  };
}

module.exports = {
  getRandomUserData,
  getSuperAdminUserData,
};
