const { readdirSync } = require('fs');
const { join } = require('path');
const { snakeCase } = require('lodash');
const { resolve } = require('app-root-path');

module.exports = Model => {
  const hooksDir = resolve(join('/server/models/hooks', snakeCase(Model.name)));
  const hooksFileNames = readdirSync(hooksDir).filter(isOperationHookFile);

  hooksFileNames.forEach(hookFileName => {
    const hookFilePath = join(hooksDir, hookFileName);
    const hook = require(hookFilePath);
    const hookName = getHookName(hookFileName);

    Model.observe(hookName, hook);
  });
};

const HOOK_FILE_NAME_REGEX = /\w+\.(\w+)\.js/;

function isOperationHookFile(fileName) {
  return HOOK_FILE_NAME_REGEX.test(fileName);
}

function getHookName(hookFileName) {
  return hookFileName.match(HOOK_FILE_NAME_REGEX)[1].replace('_', ' ');
}
