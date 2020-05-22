const request = require('supertest');
const app = require('../../../../../server/server');
const { createUser, getAccessToken } = require('../../../helpers/user');

describe('API > Users > getProfile', () => {
  const agent = request.agent(app);
  const url = id => `/api/users/${id}`;

  const userEmail = 'Test.User@example.net';
  let user;
  let otherUser;
  let accessToken;

  beforeEach(async () => {
    user = await createUser({ email: userEmail });
    otherUser = await createUser({ email: 'Other.User@example.net' });

    accessToken = await getAccessToken(user.id);
  });

  afterEach(async () => {
    await user.destroy();
    await otherUser.destroy();
  });

  describe.silent('when user isn\'t authenticated', () => {
    let response;

    beforeEach(async () => {
      response = await agent
        .get(url(otherUser.id.toString()));
    });

    it('returns status 401', async () => {
      expect(response.statusCode).toBe(401);
    });

    it('doesn\'t expose user data', () => {
      expect(response.body.id).toBeUndefined();
      expect(response.body.username).toBeUndefined();
      expect(response.body.roles).toBeUndefined();
    });
  });

  describe('when user is authenticated', () => {
    let response;

    beforeEach(async () => {
      response = await agent
        .get(url(otherUser.id))
        .query({ access_token: accessToken });
    });

    it('returns status 200', () => {
      expect(response.statusCode).toBe(200);
    });

    it('returns required profile data', () => {
      const expectedProfileData = {
        id: otherUser.id.toString(),
        username: otherUser.username,
        roles: [...otherUser.roles],
        email: otherUser.email,
        fullName: otherUser.fullName,
      };

      expect(response.body).toEqual(expectedProfileData);
    });
  });
});
