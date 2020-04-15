module.exports = {
  http: {
    path: '/current',
    verb: 'get',
  },
  returns: {
    type: 'object',
    root: true,
  },
  description: [
    'Retrieve current University.',
    'It contains required data for new Group creation.',
  ],
};
