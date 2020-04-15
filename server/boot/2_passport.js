module.exports = app => {
  // workaround for loopback issue with email suffix
  // see https://github.com/strongloop/loopback/issues/1485#issuecomment-239810961
  delete app.models.User.validations.email;
};
