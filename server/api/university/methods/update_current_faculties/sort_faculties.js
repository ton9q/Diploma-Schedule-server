const { sortBy } = require('lodash');

module.exports = async context => {
  const { faculties } = context.args;

  const sortedFaculties = sortBy(faculties, 'name');
  sortedFaculties.forEach(({ specialties }) => sortBy(specialties, 'name'));

  context.args.faculties = sortedFaculties;
};
