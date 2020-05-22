const request = require('supertest');
const app = require('../../../../../server/server');
const { reload, destroyAll } = require('../../../utils/models');
const { createUser, getAccessToken } = require('../../../helpers/user');
const { ADMIN, SUPER_ADMIN } = require('../../../../../common/constants/user_roles');

describe('API > Users > patchAttributes', () => {
  const { user: User } = app.models;
  const agent = request.agent(app);
  const url = id => `/api/users/${id}`;
  let response;
  let accessToken;

  let user;
  let otherUser;
  const newUserData = {
    email: 'New.User@example.com',
    fullName: 'New User',
  };

  beforeEach(async () => {
    user = await createUser();
    otherUser = await createUser({ email: 'Other.User@example.net' });
  });

  afterEach(async () => {
    await destroyAll(User);
  });

  describe.silent("when user isn't authenticated", () => {
    beforeEach(async () => {
      response = await agent
        .patch(url(otherUser.id))
        .send(newUserData);
    });

    expectRequestFailure({ statusCode: 401 });
  });

  describe('when user is authenticated', () => {
    beforeEach(async () => {
      otherUser = await createUser({ email: 'Other.User@example.net' });
    });

    afterEach(async () => {
      await user.destroy();
      await otherUser.destroy();
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
    it('returns status 200', () => {
      expect(response.statusCode).toBe(200);
    });

    it('update user data', async () => {
      const userAfterUpdate = await reload(otherUser);

      const expectedUser = {
        ...otherUser.toJSON(),
        ...newUserData,
      };

      expect(userAfterUpdate.toJSON()).toEqual(expectedUser);
    });
  }

  function expectRequestFailure({ statusCode }) {
    it(`returns status ${statusCode}`, () => {
      expect(response.statusCode).toBe(statusCode);
    });

    it("doesn't update user data", async () => {
      const userAfterUpdate = await reload(otherUser);

      expect(userAfterUpdate.toJSON()).toEqual(otherUser.toJSON());
    });
  }

  async function sendValidRequest() {
    response = await agent
      .patch(url(otherUser.id))
      .query({ access_token: accessToken })
      .send(newUserData);
  }
});
