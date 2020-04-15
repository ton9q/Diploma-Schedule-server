const { NotFound } = require('http-errors');
const app = require('../../../../server');

module.exports = async (attachmentTypeId, currentUserIdArg) => {
  const { Teacher } = app.models;

  const teacher = await Teacher.findById(attachmentTypeId);
  if (!teacher) {
    throw new NotFound(`Teacher with id="${attachmentTypeId}" not found`);
  }

  return teacher.updateAttributes(
    { isArchived: true },
    { updatedBy: currentUserIdArg }
  );
};
