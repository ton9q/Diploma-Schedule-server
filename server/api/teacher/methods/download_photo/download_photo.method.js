const { NotFound } = require('http-errors');
const { promisify } = require('util');
const app = require('../../../../server');

const container = 'teacher';

module.exports = async (teacherId, context) => {
  const { Teacher, MyFile } = app.models;
  const { res: response } = context;

  const teacher = await Teacher.findById(teacherId);
  if (!teacher) {
    throw new NotFound(`Teacher with id="${teacherId}" not found`);
  }

  const photoId = teacher.photoId;
  if (!photoId) {
    throw new NotFound(`Photo of teacher with id="${teacherId}" not found`);
  }

  const teacherFiles = await MyFile.getFiles(container);
  const teacherFile = teacherFiles.find(teacherFile => teacherFile._id.equals(photoId));

  const MyFileDownloadAsync = promisify(MyFile.download);

  return MyFileDownloadAsync(container, teacherFile.filename, response);
};
