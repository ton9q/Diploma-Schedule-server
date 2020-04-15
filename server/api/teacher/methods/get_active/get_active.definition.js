module.exports = {
  http: {
    path: '/active',
    verb: 'get',
  },
  returns: {
    type: 'array',
    root: true,
  },
  description: 'Get active (not archived) teachers',
};
