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

const createUniversityDataByGroupsData = groupsData => {
  const facultiesData = groupsData.map(({ faculty, specialty, numberSemesters }) => {
    return {
      faculty,
      specialty,
      numberSemesters,
    };
  });

  const universityFacultiesData = [];
  facultiesData.forEach(({ faculty, specialty, numberSemesters }) => {
    const facultyIndex = universityFacultiesData.findIndex(({ name }) => name === faculty);

    if (facultyIndex === -1) {
      universityFacultiesData.push({
        name: faculty,
        specialties: [{
          name: specialty,
          numberSemesters,
        }],
      });

      return;
    }

    const facultySpecialties = universityFacultiesData[facultyIndex].specialties;
    const specialtyIndex = facultySpecialties.findIndex(({ name }) => name === specialty);

    if (specialtyIndex !== -1) {
      return;
    }

    facultySpecialties.push({
      name: specialty,
      numberSemesters,
    });
  });

  return {
    faculties: universityFacultiesData,
  };
};


module.exports = {
  createUniversity,
  createUniversityDataByGroupsData,
};
