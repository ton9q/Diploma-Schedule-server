const cookieParser = require('cookie-parser');
const app = require('../server');

module.exports = () => {
  const cookieSecret = app.get('cookieSecret');

  return cookieParser(cookieSecret);
};
