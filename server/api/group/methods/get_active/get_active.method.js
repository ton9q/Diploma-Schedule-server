const app = require('../../../../server');
const { getRegExp } = require('../../../../utils/regexp');

module.exports = async (faculty, specialty) => {
  const { Group } = app.models;

  const filter = {
    where: {
      isArchived: false,
    },
    order: 'groupName ASC',
  };

  if (faculty) {
    const facultyRegex = getRegExp(faculty, { caseSensitive: false });
    filter.where.faculty = facultyRegex;
  }

  if (specialty) {
    const specialtyRegex = getRegExp(specialty, { caseSensitive: false });
    filter.where.specialty = specialtyRegex;
  }

  return Group.find(filter);
};
