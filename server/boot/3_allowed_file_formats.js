module.exports = app => {
  app.dataSources.gridfs.connector.allowedContentTypes = [
    'image/jpg',
    'image/jpeg',
    'image/png',
  ];
};
