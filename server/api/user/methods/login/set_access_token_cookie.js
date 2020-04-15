module.exports = async context => {
  const accessToken = context.result.id;

  context.res.cookie('accessToken', accessToken, { signed: true });
};
