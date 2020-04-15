const app = require('../server');

module.exports = () => {
  if (app.get('forceHttps')) {
    return forceHttps;
  }

  return (req, res, next) => next();
};

function forceHttps(req, res, next) {
  if (req.protocol === 'http') {
    res.redirect(`https://${req.headers.host}${req.url}`);
    return;
  }

  next();
}
