const { get } = require('lodash');
const app = require('../../../../server');

module.exports = async context => {
  if (context.user) {
    return;
  }

  const userId = get(context, 'req.accessToken.userId');
  if (!userId) {
    return;
  }

  const user = await app.models.user.findById(userId);
  if (!user) {
    return;
  }

  context.user = user;
};
