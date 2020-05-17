const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const logger = require('../../logger')(module);
const app = require('../../server');
const { getRegExp } = require('../../utils/regexp');

const readDirAsync = promisify(fs.readdir);
const readFileAsync = promisify(fs.readFile);

const teacherPhotosDirectoryPath = path.join(__dirname, '../data/teacher_photos');

module.exports = async () => {
  const { Teacher } = app.models;

  logger.info('add photos to teachers');

  const fileNames = await readDirAsync(teacherPhotosDirectoryPath);

  await Promise.all(fileNames.map(async fileName => {
    const fullNameRegExp = getRegExp(fileName.split('.')[0], { exactMatch: false, caseSensitive: false });
    const teacher = await Teacher.findOne({ where: { fullName: fullNameRegExp } });
    if (!teacher) {
      return;
    }

    const pathToTeacherPhoto = path.join(teacherPhotosDirectoryPath, fileName);
    const photo = await readFileAsync(pathToTeacherPhoto);

    // teacher.photo = photo;
    // await teacher.save();
  }));
  //   });


  //   const userId = await getUserId();

  //   const wrappedTeachers = map(teachersData, teacher => merge(teacher, { createdBy: userId }));

//   await Teacher.create(wrappedTeachers);
};
