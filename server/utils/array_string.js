module.exports = array => {
  return array
    .map(element => `"${element}"`)
    .join(', ');
};
