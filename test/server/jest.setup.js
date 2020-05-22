module.exports = async () => {
  process.env.NODE_ENV = 'test';
  process.env.DB_URL = 'mongodb://localhost:27017/diploma-test';
};
