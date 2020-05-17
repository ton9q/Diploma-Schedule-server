const { NotFound } = require('http-errors');
const app = require('../../../../server');

module.exports = async (teacherId, currentUserIdArg) => {
  const { Teacher } = app.models;

  const teacher = await Teacher.findById(teacherId);
  if (!teacher) {
    throw new NotFound(`Teacher with id="${teacherId}" not found`);
  }

  return teacher.updateAttributes(
    { isArchived: true },
    { updatedBy: currentUserIdArg }
  );
};
