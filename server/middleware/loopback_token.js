const app = require('../server');

module.exports = () => app.loopback.token({
  model: app.models.accessToken,
  searchDefaultTokenKeys: false,
  cookies: ['accessToken', 'access_token'],
  params: ['accessToken', 'access_token'],
  headers: ['Authorization'],
});
