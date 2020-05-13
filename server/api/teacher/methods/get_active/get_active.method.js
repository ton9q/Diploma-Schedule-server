const app = require('../../../../server');
const { getRegExp } = require('../../../../utils/regexp');

module.exports = async faculty => {
  const { Teacher } = app.models;

  const filter = {
    where: {
      isArchived: false,
    },
    order: 'fullName ASC',
  };

  if (faculty) {
    const facultyRegex = getRegExp(faculty, { caseSensitive: false });
    filter.where.faculty = facultyRegex;
  }

  return Teacher.find(filter);
};
