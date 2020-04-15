// const fs = require('fs');
// const multiparty = require('multiparty');
// const { BadRequest } = require('http-errors');
// const { resolve } = require('app-root-path');
// const app = require('../../../../server');
// // const BoxStorageService = require('../../../../services/box_storage.service');
// const removeTempFiles = require('./remove_temp_files');
// const getFileFromRequest = require('../../../../utils/get_file_from_request');

// const TEMP_DIR = resolve('temp');

// module.exports = (
//   context,
//   relationType,
//   relationId,
//   attachmentType,
//   currentUserId,
//   next
// ) => {
//   const { Attachment: Teacher } = app.models;
//   const { req, folderId } = context;

//   const form = new multiparty.Form({ uploadDir: TEMP_DIR });

//   form.parse(req, async (err, fields, files) => {
//     try {
//       if (err) {
//         throw err;
//       }

//       const fileDetails = getFileFromRequest({ files, fileNumber: 1 });

//       if (!fileDetails) {
//         throw new BadRequest('Teacher photo file wasn\'t uploaded');
//       }

//       const filePath = fileDetails.path;
//       const fileName = fileDetails.originalFilename;
//       const fileSize = fileDetails.size;

//       const readableStream = fs.createReadStream(filePath);
//       const storageFileId = await BoxStorageService.uploadFile({
//         readableStream,
//         folderId,
//         fileName,
//         fileSize,
//         currentUserId,
//       });

//       const attachment = await Teacher.create({
//         storageFileId,
//         storageFolderId: folderId,
//       }, {
//         createdBy: currentUserId,
//       });

//       next(null, attachment);

//     } catch (err) {
//       next(err);

//     } finally {
//       if (files) {
//         removeTempFiles(files);
//       }
//     }
//   });
// };
