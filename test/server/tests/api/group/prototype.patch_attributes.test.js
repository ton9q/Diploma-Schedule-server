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
  const url = id => `/api/Groups/${id}`;
  let response;
  let accessToken;

  const faculties = [{
    name: 'faculty_1',
    specialties: [{
      name: 'specialty_1',
      numberSemesters: 8,
    }],
  }, {
    name: 'new-faculty',
    specialties: [{
      name: 'new-specialty',
      numberSemesters: 8,
    }],
  }];
  const newGroupData = createGroupData({
    faculty: faculties[1].name,
    specialty: faculties[1].specialties[0].name,
    numberSemesters: faculties[1].specialties[0].numberSemesters,
  });
  let user;
  let groupCreator;
  let group;

  beforeEach(async () => {
    user = await createUser();
    groupCreator = await createUser();

    await createUniversity({ faculties }, { createdBy: user.id });
    group = await createGroup({
      faculty: faculties[0].name,
      specialty: faculties[0].specialties[0].name,
      numberSemesters: faculties[0].specialties[0].numberSemesters,
    }, { createdBy: groupCreator.id });
  });

  afterEach(async () => {
    await destroyAll(User, Group, University);
  });

  describe.silent("when user isn't authenticated", () => {
    beforeEach(async () => {
      response = await agent
        .patch(url(group.id))
        .send(newGroupData);
    });

    expectRequestFailure({ statusCode: 401 });
  });

  describe('when user is authenticated', () => {
    beforeEach(async () => {
      group = await createGroup({
        faculty: faculties[0].name,
        specialty: faculties[0].specialties[0].name,
        numberSemesters: faculties[0].specialties[0].numberSemesters,
      }, { createdBy: groupCreator.id });
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
      });

      describe.silent('when group contains not existed "faculty" and "specialty"', () => {
        beforeEach(async () => {
          response = await agent
            .patch(url(group.id))
            .query({ access_token: accessToken })
            .send({
              ...newGroupData,
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

    it('update group data', async () => {
      const groupAfterUpdate = await reload(group);

      const expectedGroup = prepareGroupForComparing({
        ...group.toJSON(),
        ...newGroupData,
      });

      expect(prepareGroupForComparing(groupAfterUpdate)).toEqual(expectedGroup);
    });
  }

  function expectRequestFailure({ statusCode }) {
    it(`returns status ${statusCode}`, () => {
      expect(response.statusCode).toBe(statusCode);
    });

    it("doesn't update group data", async () => {
      const groupAfterUpdate = await reload(group);

      expect(groupAfterUpdate.toJSON()).toEqual(group.toJSON());
    });
  }

  async function sendValidRequest() {
    response = await agent
      .patch(url(group.id))
      .query({ access_token: accessToken })
      .send(newGroupData);
  }
});
