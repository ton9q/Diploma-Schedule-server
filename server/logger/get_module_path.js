const path = require('path');
const appRootPath = require('app-root-path').toString();

module.exports = module => path.relative(appRootPath, module.filename);
