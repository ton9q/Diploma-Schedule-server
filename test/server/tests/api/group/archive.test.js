const request = require('supertest');
const app = require('../../../../../server/server');
const { destroyAll, reload } = require('../../../utils/models');
const { createUser, getAccessToken } = require('../../../helpers/user');
const { createGroupData, createGroup, prepareGroupForComparing } = require('../../../helpers/group');
const { createUniversity } = require('../../../helpers/university');
const { ADMIN } = require('../../../../../common/constants/user_roles');

describe('API > Groups > patchAttributes', () => {
  const { user: User, Group, University } = app.models;
  const agent = request.agent(app);
  const url = id => `/api/Groups/${id}/archive`;
  let response;
  let accessToken;

  const faculty = {
    name: 'new-faculty',
    specialties: [{
      name: 'new-specialty',
      numberSemesters: 8,
    }],
  };
  const groupData = createGroupData({
    faculty: faculty.name,
    specialty: faculty.specialties[0].name,
    numberSemesters: faculty.specialties[0].numberSemesters,
  });
  let user;
  let groupCreator;
  let group;

  beforeEach(async () => {
    user = await createUser();
    groupCreator = await createUser();

    await createUniversity({ faculties: [faculty] }, { createdBy: user.id });
    group = await createGroup(groupData, { createdBy: groupCreator.id });
  });

  afterEach(async () => {
    await destroyAll(User, Group, University);
  });

  describe.silent("when user isn't authenticated", () => {
    beforeEach(async () => {
      response = await agent
        .post(url(group.id));
    });

    expectRequestFailure({ statusCode: 401 });
  });

  describe('when user is authenticated', () => {
    beforeEach(async () => {
      group = await createGroup(groupData, { createdBy: groupCreator.id });
    });

    afterEach(async () => {
      await user.destroy();
      await group.destroy();
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

      expectRequestSuccess();
    });
  });

  function expectRequestSuccess() {
    it('returns status 200', () => {
      expect(response.statusCode).toBe(200);
    });

    it("doesn't update main group data", async () => {
      const groupAfterArchive = await reload(group);

      expect(prepareGroupForComparing(groupAfterArchive.toJSON()))
        .toEqual(prepareGroupForComparing(group.toJSON()));
    });

    it('mark group as archived', async () => {
      const groupAfterArchive = await Group.findById(group.id);

      expect(groupAfterArchive.isArchived).toBeTruthy();
    });
  }

  function expectRequestFailure({ statusCode }) {
    it(`returns status ${statusCode}`, () => {
      expect(response.statusCode).toBe(statusCode);
    });

    it("doesn't update group data", async () => {
      const groupAfterArchive = await reload(group);

      expect(groupAfterArchive.toJSON()).toEqual(group.toJSON());
    });
  }

  async function sendValidRequest() {
    response = await agent
      .post(url(group.id))
      .query({ access_token: accessToken });
  }
});
