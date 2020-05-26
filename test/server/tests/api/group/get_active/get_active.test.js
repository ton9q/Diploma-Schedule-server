const request = require('supertest');
const { sortBy } = require('lodash');
const app = require('../../../../../../server/server');
const { ADMIN, CREATOR } = require('../../../../../../common/constants/user_roles');
const { createUser } = require('../../../../helpers/user');
const { prepareGroupForComparing } = require('../../../../helpers/group');
const { createUniversityDataByGroupsData } = require('../../../../helpers/university');
const { destroyAll } = require('../../../../utils/models');
const validCases = require('./get_active_valid_cases');

describe('API > Groups > getActive', () => {
  const { user: User, Group, University } = app.models;
  const agent = request.agent(app);
  const url = '/api/Groups/active';
  let response;

  let universityCreator;
  let groupCreator;
  let defaultGroupData;

  beforeEach(async () => {
    universityCreator = await createUser({ roles: [ADMIN] });
    groupCreator = await createUser({ roles: [CREATOR] });

    defaultGroupData = {
      groupName: 'group_name',
      faculty: 'faculty',
      specialty: 'specialty',
      numberSemesters: 8,
      createdBy: groupCreator.id,
      createdAt: new Date(),
      updatedBy: groupCreator.id,
      updatedAt: new Date(),
    };
  });

  afterEach(async () => {
    await destroyAll(User);
  });

  describe("when user isn't authenticated", () => {
    validCases.forEach(({
      description,
      searchParams,
      groups: groupsOverrides,
      expectedIndexes,
      skip,
    }) => {
      const describeOrSkip = skip ? describe.skip : describe;
      let groups;

      describeOrSkip(description, () => {
        let universityData;
        beforeEach(async () => {
          const groupsData = groupsOverrides.map((groupOverrides, itemIndex) => {
            return {
              ...defaultGroupData,
              groupName: `group_name_${itemIndex}`,
              ...groupOverrides,
              createdBy: groupCreator.id,
            };
          });

          universityData = createUniversityDataByGroupsData(groupsData);

          await University.create(universityData, {
            createdBy: universityCreator.id,
          });
          groups = await Group.create(groupsData);

          response = await agent
            .get(url)
            .query(searchParams);
        });

        afterEach(async () => {
          await destroyAll(Group, University);
        });

        it('returns status 200', () => {
          expect(response.statusCode).toBe(200);
        });

        it('returns groups according to search params', () => {
          const expectedGroups = sortBy(
            expectedIndexes.map(index => prepareGroupForComparing(groups[index])),
            'groupName'
          );
          const preparedGroups = response.body.map(group => prepareGroupForComparing(group));

          expect(response.body.length).toBe(expectedGroups.length);
          expect(preparedGroups).toEqual(expectedGroups);
        });
      });
    });
  });
});
