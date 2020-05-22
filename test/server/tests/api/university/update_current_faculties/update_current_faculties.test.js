const request = require('supertest');
const app = require('../../../../../../server/server');
const { reload } = require('../../../../utils/models');
const { createUser, getAccessToken } = require('../../../../helpers/user');
const { createUniversity } = require('../../../../helpers/university');
const { CREATOR, ADMIN } = require('../../../../../../common/constants/user_roles');
const VALID_FACULTIES_CASES = require('./valid_faculties_cases');
const INVALID_FACULTIES_CASES = require('./invalid_faculties_cases');

describe('API > Universities > updateCurrentFaculties', () => {
  const { user: User, University } = app.models;
  const url = '/api/Universities/current/faculties';
  const agent = request.agent(app);
  let response;
  let accessToken;

  let universityCreator;
  let university;
  const initialFaculties = [{
    name: 'faculty_1',
    specialties: [{
      name: 'specialty_11',
      numberSemesters: 8,
    }],
  }, {
    name: 'faculty_2',
    specialties: [{
      name: 'specialty_21',
      numberSemesters: 8,
    }],
  }];

  beforeEach(async () => {
    universityCreator = await createUser();
    university = await createUniversity({
      faculties: initialFaculties,
    }, {
      createdBy: universityCreator.id,
    });
  });

  afterEach(async () => {
    await University.destroyById(university.id);
    await User.destroyById(universityCreator.id);
  });

  describe.silent("when user isn't authenticated", () => {
    beforeEach(async () => {
      response = await agent
        .patch(url)
        .send(initialFaculties);
    });

    expectRequestFailure({ statusCode: 401 });
  });

  describe('when user is authenticated', () => {
    describe.silent("when user doesn't have Admin role", () => {
      let notAdmin;

      beforeEach(async () => {
        notAdmin = await createUser({ roles: [CREATOR], username: 'not-admin' });
        accessToken = await getAccessToken(notAdmin.id);

        response = await agent
          .patch(url)
          .query({ access_token: accessToken })
          .send(initialFaculties);
      });

      afterEach(async () => {
        await User.destroyById(notAdmin.id);
      });

      expectRequestFailure({ statusCode: 403 });
    });

    describe('when user has Admin role', () => {
      let admin;

      beforeEach(async () => {
        admin = await createUser({ roles: [ADMIN], username: 'admin' });
        accessToken = await getAccessToken(admin.id);
      });

      afterEach(async () => {
        await User.destroyById(admin.id);
      });

      describe('when "faculties" field has invalid format', () => {
        INVALID_FACULTIES_CASES.forEach(({ description, faculties: newFaculties, skip }) => {
          const describeOrSkip = skip ? describe.skip : describe.silent;

          describeOrSkip(description, () => {
            beforeEach(async () => {
              response = await agent
                .patch(url)
                .query({ access_token: accessToken })
                .send(newFaculties);
            });

            expectRequestFailure({ statusCode: 422 });
          });
        });
      });

      describe('when "faculties" field has valid format', () => {
        VALID_FACULTIES_CASES.forEach(({ description, faculties: newFaculties }) => {
          describe(description, () => {
            beforeEach(async () => {
              response = await agent
                .patch(url)
                .query({ access_token: accessToken })
                .send(newFaculties);
            });

            expectRequestSuccess({ faculties: newFaculties });
          });
        });

        describe('when "faculties" are not sorted', () => {
          const unsortedFaculties = [{
            name: 'faculty_2',
            specialties: [{
              name: 'specialty_22',
              numberSemesters: 10,
            }, {
              name: 'specialty_21',
              numberSemesters: 9,
            }],
          }, {
            name: 'faculty_1',
            specialties: [{
              name: 'specialty_11',
              numberSemesters: 7,
            }, {
              name: 'specialty_12',
              numberSemesters: 8,
            }],
          }];
          const sortedFaculties = [{
            name: 'faculty_1',
            specialties: [{
              name: 'specialty_11',
              numberSemesters: 7,
            }, {
              name: 'specialty_12',
              numberSemesters: 8,
            }],
          }, {
            name: 'faculty_2',
            specialties: [{
              name: 'specialty_21',
              numberSemesters: 9,
            }, {
              name: 'specialty_22',
              numberSemesters: 10,
            }],
          }];

          beforeEach(async () => {
            response = await agent
              .patch(url)
              .query({ access_token: accessToken })
              .send(unsortedFaculties);
          });

          expectRequestSuccess({ faculties: sortedFaculties });
        });
      });
    });
  });

  function expectRequestSuccess({ faculties }) {
    it('returns status 200', () => {
      expect(response.statusCode).toBe(200);
    });

    it('returns updated "faculties" field in response', () => {
      expect(response.body.faculties).toEqual(faculties);
    });

    it('updates "faculties" field of current university', async () => {
      const updatedUniversity = await reload(university);
      const updatedFaculties = updatedUniversity.toJSON().faculties;

      expect(updatedFaculties).toEqual(faculties);
    });
  }

  function expectRequestFailure({ statusCode }) {
    it(`returns status ${statusCode}`, () => {
      expect(response.statusCode).toBe(statusCode);
    });

    it("doesn't updates 'faculties' field of current university", async () => {
      university = await University.findById(university.id);
      const persistedFaculties = university.toJSON().faculties;

      expect(persistedFaculties).toEqual(initialFaculties);
    });
  }
});
