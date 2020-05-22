const request = require('supertest');
const app = require('../../../../../server/server');
const { createUser, getAccessToken } = require('../../../helpers/user');

describe('API > Users > getProfile', () => {
  const agent = request.agent(app);
  const url = '/api/users/profile';

  const userEmail = 'Test.User@example.net';
  let user;
  let accessToken;

  beforeEach(async () => {
    user = await createUser({ email: userEmail });
    accessToken = await getAccessToken(user.id);
  });

  afterEach(async () => {
    await user.destroy();
  });

  describe.silent('when user isn\'t authenticated', () => {
    let response;

    beforeEach(async () => {
      response = await agent
        .get(url);
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
        .get(url)
        .query({ access_token: accessToken });
    });

    it('returns status 200', () => {
      expect(response.statusCode).toBe(200);
    });

    it('returns required profile data', () => {
      const expectedProfileData = {
        id: user.id.toString(),
        username: user.username,
        roles: [...user.roles],
        email: user.email,
        fullName: user.fullName,
      };

      expect(response.body).toEqual(expectedProfileData);
    });
  });
});
