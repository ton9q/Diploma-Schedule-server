const { readdirSync } = require('fs');
const { join } = require('path');
const { snakeCase, camelCase } = require('lodash');
const { resolve } = require('app-root-path');
const logger = require('../../../logger')(module, { label: 'validation' });

module.exports = Model => {
  const validationsDir = resolve(join('/server/models/validations', snakeCase(Model.name)));
  const validationFileNames = readdirSync(validationsDir).filter(isValidationFile);

  validationFileNames.forEach(validationFileName => {
    const validationFilePath = join(validationsDir, validationFileName);
    const validation = require(validationFilePath);
    const validatedField = getValidatedField(validationFileName);
    const wrappedValidation = wrapValidation({ validation, Model, validatedField });

    Model.validate(validatedField, wrappedValidation);
  });
};

function isValidationFile(fileName) {
  return fileName.endsWith('.validation.js');
}

function getValidatedField(validationFileName) {
  return camelCase(validationFileName.replace('.validation.js', ''));
}

function wrapValidation({ validation, Model, validatedField }) {
  return function (err) {
    try {
      validation(this, raise);

    } catch (error) {
      logger.error(`Invalid "${Model.name}" instance. Validation failed on field "${validatedField}":`);
      logger.error(error);

      err();
    }
  };
}

function raise(errorMessage) {
  throw new Error(errorMessage);
}
