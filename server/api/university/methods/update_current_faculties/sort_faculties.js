const { sortBy } = require('lodash');

module.exports = async context => {
  const { faculties } = context.args;

  const sortedFaculties = sortBy(faculties, 'name');
  const sortedFacultiesWithSpecialties = sortedFaculties.map(sortedFaculty => {
    return {
      ...sortedFaculty,
      specialties: sortBy(sortedFaculty.specialties, 'name'),
    };
  });

  context.args.faculties = sortedFacultiesWithSpecialties;
};
