const app = require('../../../server/server');
const { CREATOR } = require('../../../common/constants/user_roles');

const generateUsername = (() => {
  let generatedUsernameCount = 0;

  return () => {
    generatedUsernameCount += 1;
    return `test.user.${generatedUsernameCount}@example.net`;
  };
})();

const createUserData = (fields = {}) => {
  const username = fields.username || generateUsername();
  const email = username;

  return {
    username,
    password: 'password',
    fullName: 'Test User',
    email,
    roles: [CREATOR],
    ...fields,
  };
};

const createUser = async (fields = {}) => {
  const { user: User } = app.models;

  const userData = createUserData(fields);
  const user = await User.create(userData);

  await user.accessTokens.create({
    ttl: 14 * 24 * 60 * 60,
    created: new Date(),
  });

  return user;
};

const getAccessToken = async userId => {
  const { accessToken: AccessToken } = app.models;
  const accessToken = await AccessToken.findOne({ where: { userId } });

  return accessToken.id;
};

module.exports = {
  createUserData,
  createUser,
  getAccessToken,
};
