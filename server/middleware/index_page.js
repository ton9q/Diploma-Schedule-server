const staticPageMiddleware = require('./static_page');

module.exports = () => staticPageMiddleware({
  fileName: 'index.html',
});
