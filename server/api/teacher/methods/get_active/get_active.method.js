const app = require('../../../../server');

module.exports = async () => {
  const { Teacher } = app.models;

  const teachers = await Teacher.find({
    where: {
      isArchived: false,
    },
    order: 'fullName ASC',
  });

  return teachers;
};
