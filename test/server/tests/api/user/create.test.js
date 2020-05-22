const request = require('supertest');
const { omit } = require('lodash');
const app = require('../../../../../server/server');
const { destroyAll } = require('../../../utils/models');
const { createUserData, createUser, getAccessToken } = require('../../../helpers/user');
const { ADMIN, SUPER_ADMIN } = require('../../../../../common/constants/user_roles');

describe('API > Users > create', () => {
  const { user: User } = app.models;
  const agent = request.agent(app);
  const url = '/api/users';
  let response;
  let accessToken;

  let user;
  const userData = createUserData({ username: 'New Username' });

  beforeEach(async () => {
    user = await createUser();
  });

  afterEach(async () => {
    await destroyAll(User);
  });

  describe.silent("when user isn't authenticated", () => {
    beforeEach(async () => {
      response = await agent
        .post(url)
        .send(userData);
    });

    expectRequestFailure({ statusCode: 401 });
  });

  describe('when user is authenticated', () => {
    afterEach(async () => {
      await user.destroy();
    });

    describe('when user is CREATOR', () => {
      beforeEach(async () => {
        accessToken = await getAccessToken(user.id);

        await sendValidRequest();
      });

      expectRequestFailure({ statusCode: 403 });
    });

    describe('when user is ADMIN', () => {
      beforeEach(async () => {
        user = await createUser({ roles: [ADMIN] });
        accessToken = await getAccessToken(user.id);

        await sendValidRequest();
      });

      expectRequestFailure({ statusCode: 403 });
    });

    describe('when user is SUPER_ADMIN', () => {
      beforeEach(async () => {
        user = await createUser({ roles: [SUPER_ADMIN] });
        accessToken = await getAccessToken(user.id);

        await sendValidRequest();
      });

      expectRequestSuccess();
    });
  });

  function expectRequestSuccess() {
    const expectedUser = omit(userData, ['password']);

    it('returns status 200', () => {
      expect(response.statusCode).toBe(200);
    });

    it('create new user', async () => {
      const newUsers = await User.find({ where: { username: userData.username } });

      expect(newUsers.length).toBe(1);

      const createdUser = omit(newUsers[0].toJSON(), [
        'id',
        'emailVerified',
        'realm',
      ]);

      expect(createdUser).toEqual(expectedUser);
    });

    it('returned created user', async () => {
      const returnedUser = omit(response.body, ['id']);

      expect(returnedUser).toEqual(expectedUser);
    });
  }

  function expectRequestFailure({ statusCode }) {
    it(`returns status ${statusCode}`, () => {
      expect(response.statusCode).toBe(statusCode);
    });

    it("doesn't create new user", async () => {
      const newUsers = await User.find({ where: { username: userData.username } });

      expect(newUsers.length).toBe(0);
    });
  }

  async function sendValidRequest() {
    response = await agent
      .post(url)
      .query({ access_token: accessToken })
      .send(userData);
  }
});
