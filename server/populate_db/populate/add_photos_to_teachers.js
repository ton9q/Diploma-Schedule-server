const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const fetch = require('node-fetch');
const FormData = require('form-data');
const logger = require('../../logger')(module);
const app = require('../../server');
const { getRegExp } = require('../../utils/regexp');

const readDirAsync = promisify(fs.readdir);
const readFileAsync = promisify(fs.readFile);

const teacherPhotosDirectoryPath = path.join(__dirname, '../data/teacher_photos');

function sleep (time = 5000) {
  logger.silly(`SLEEP ${time / 1000} seconds`);
  logger.silly('SLEEP START');

  return new Promise(resolve => {
    setTimeout(() => {
      logger.silly('SLEEP END');
      resolve();
    }, time);
  });
}

function formatQuery(params) {
  return Object.keys(params)
    .map(k => `${encodeURI(k)}=${encodeURI(params[k])}`)
    .join('&');
}

const container = 'teacher';
const urlContainerUpload = `http://localhost:3000/api/MyFiles/${container}/upload`;
const accessToken = process.env.ACCESS_TOKEN;

module.exports = async () => {
  const { Teacher } = app.models;

  logger.info('add photos to teachers');

  const fileNames = await readDirAsync(teacherPhotosDirectoryPath);

  await Promise.all(fileNames.map(async (fileName, index) => {
    const fullNameRegExp = getRegExp(fileName.split('.')[0], { exactMatch: false, caseSensitive: false });
    const teacher = await Teacher.findOne({ where: { fullName: fullNameRegExp } });
    if (!teacher) {
      logger.info(`teacher with part of fullName="${fullNameRegExp}" not founded`);
      return;
    }

    const pathToTeacherPhoto = path.join(teacherPhotosDirectoryPath, fileName);
    const photoFile = await readFileAsync(pathToTeacherPhoto);
    const photoExtension = fileName.split('.')[1];
    const formData = new FormData();

    formData.append('file', photoFile, {
      contentType: `image/${photoExtension}`,
      filename: `${teacher.id}.${photoExtension}`,
    });

    sleep(100 * index);

    const queryParams = {
      access_token: accessToken,
      teacherId: teacher.id,
    };

    await fetch(`${urlContainerUpload}?${formatQuery(queryParams)}`, {
      method: 'POST',
      body: formData,
    });

    logger.info(`file for teacher with id="${teacher.id}" was added`);
  }));
};
