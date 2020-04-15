const fs = require('fs');
const logger = require('../../../../logger')(module);

module.exports = files => {
  try {
    const filePaths = Object.values(files).map(file => file[0].path);

    filePaths.forEach(filePath => {
      fs.unlink(filePath, err => {
        if (err) {
          logger.error(
            `Failed to remove temporary file "${filePath}":\n  ${err.message}\n  ${err.stack}`
          );
        }
      });
    });
  } catch (err) {
    logger.error(err);
  }
};
