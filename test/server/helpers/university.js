const app = require('../../../server/server');

const createUniversity = async (fields = {}, { createdBy } = {}) => {
  const { University } = app.models;

  const university = await University.create({
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
    ...fields,
  }, { createdBy });

  return university;
};

module.exports = {
  createUniversity,
};
