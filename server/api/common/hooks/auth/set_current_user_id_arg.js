module.exports = async context => {
  context.args.currentUserId = context.req.accessToken.userId;
};
