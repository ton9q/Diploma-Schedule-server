module.exports = (array, callback) => {
  if (Array.isArray(array)) {
    array.forEach(callback);
  }
};
