const request = require('supertest');
const app = require('../../../../../server/server');
const { destroyAll } = require('../../../utils/models');
const { createUser, getAccessToken } = require('../../../helpers/user');
const { createGroupData, prepareGroupForComparing } = require('../../../helpers/group');
const { createUniversity } = require('../../../helpers/university');
const { ADMIN } = require('../../../../../common/constants/user_roles');

describe('API > Groups > create', () => {
  const { user: User, Group, University } = app.models;
  const agent = request.agent(app);
  const url = '/api/Groups';
  let response;
  let accessToken;

  let user;
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

  beforeEach(async () => {
    user = await createUser();
    await createUniversity({ faculties: [faculty] }, { createdBy: user.id });
  });

  afterEach(async () => {
    await destroyAll(User, University);
  });

  describe.silent("when user isn't authenticated", () => {
    beforeEach(async () => {
      response = await agent
        .post(url)
        .send(groupData);
    });

    expectRequestFailure({ statusCode: 401 });
  });

  describe('when user is authenticated', () => {
    afterEach(async () => {
      await user.destroy();
      await Group.destroyAll();
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
      });

      afterEach(async () => {
        await Group.destroyAll();
      });

      describe.silent('when group with that name already existed', () => {
        beforeEach(async () => {
          await Group.create(groupData, { createdBy: user.id });
          await sendValidRequest();
        });

        it('returns status 422', () => {
          expect(response.statusCode).toBe(422);
        });

        it("doesn't create other group with that name", async () => {
          const newGroups = await Group.find({ where: { groupName: groupData.groupName } });

          expect(newGroups.length).toBe(1);
        });
      });

      describe.silent('when group contains not existed "faculty" and "specialty"', () => {
        beforeEach(async () => {
          response = await agent
            .post(url)
            .query({ access_token: accessToken })
            .send({
              ...groupData,
              faculty: 'other-faculty',
              specialty: 'other-specialty',
            });
        });

        expectRequestFailure({ statusCode: 422 });
      });

      describe('when group contains existed "faculty" and "specialty"', () => {
        beforeEach(async () => {
          await sendValidRequest();
        });

        expectRequestSuccess();
      });
    });
  });

  function expectRequestSuccess() {
    it('returns status 200', () => {
      expect(response.statusCode).toBe(200);
    });

    it('create new group', async () => {
      const newGroups = await Group.find({ where: { groupName: groupData.groupName } });

      expect(newGroups.length).toBe(1);

      const createdGroup = prepareGroupForComparing(newGroups[0]);

      expect(createdGroup).toEqual(groupData);
    });

    it('returned created group', async () => {
      const returnedGroup = prepareGroupForComparing(response.body);

      expect(returnedGroup).toEqual(groupData);
    });
  }

  function expectRequestFailure({ statusCode }) {
    it(`returns status ${statusCode}`, () => {
      expect(response.statusCode).toBe(statusCode);
    });

    it("doesn't create new group", async () => {
      const newGroups = await Group.find({ where: { groupName: groupData.groupName } });

      expect(newGroups.length).toBe(0);
    });
  }

  async function sendValidRequest() {
    response = await agent
      .post(url)
      .query({ access_token: accessToken })
      .send(groupData);
  }
});
