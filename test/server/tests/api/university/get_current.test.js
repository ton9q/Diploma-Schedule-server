const request = require('supertest');
const app = require('../../../../../server/server');
const { createUser } = require('../../../helpers/user');

describe('API > Universities > getCurrent', () => {
  const { user: User, University } = app.models;
  const url = '/api/Universities/current';
  const agent = request.agent(app);
  let response;

  let user;
  const universityData = {
    faculties: [{
      name: 'faculty_1',
      specialties: [{
        name: 'specialty_11',
        numberSemesters: 8,
      }, {
        name: 'specialty_12',
        numberSemesters: 10,
      }],
    }, {
      name: 'faculty_2',
      specialties: [{
        name: 'specialty_21',
        numberSemesters: 8,
      }, {
        name: 'specialty_22',
        numberSemesters: 10,
      }],
    }],
  };

  beforeAll(async () => {
    user = await createUser();
  });

  afterAll(async () => {
    await User.destroyAll();
  });

  describe("when user isn't authenticated", () => {
    describe.silent("when current university doesn't exist", () => {
      beforeEach(async () => {
        response = await agent
          .get(url);
      });

      it('returns status 404', () => {
        expect(response.statusCode).toBe(404);
      });
    });

    describe('when current university exists', () => {
      let university;

      beforeEach(async () => {
        university = await University.create(universityData, {
          createdBy: user.id,
        });

        response = await agent
          .get(url);
      });

      afterEach(async () => {
        await university.destroy();
      });

      it('returns status 200', () => {
        expect(response.statusCode).toBe(200);
      });

      it('returns correct "faculties"', () => {
        expect(typeof response.body.faculties).toBe('object');
        expect(response.body.faculties).toEqual(universityData.faculties);
      });
    });
  });
});
