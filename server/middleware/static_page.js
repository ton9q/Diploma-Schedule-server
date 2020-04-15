const { existsSync } = require('fs');
const { resolve } = require('app-root-path');

module.exports = ({ fileName, urlPrefix }) => {
  const pageFilePath = resolve(`public/${fileName}`);
  const pageExists = existsSync(pageFilePath);

  if (pageExists) {
    return (req, res, next) => {
      if (urlPrefix && !req.url.startsWith(urlPrefix)) {
        next();
        return;
      }

      res.sendFile(pageFilePath);
    };
  }

  return (req, res) => res.status(404).end(`Page ${fileName} not found`);
};
