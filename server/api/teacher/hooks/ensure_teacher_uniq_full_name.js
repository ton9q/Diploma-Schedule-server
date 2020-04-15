const { find } = require('lodash');
const { Forbidden } = require('http-errors');
const app = require('../../../server');

module.exports = async context => {
  const { fullName } = context.args.data;
  const id = context.ctorArgs && context.ctorArgs.id;
  const { Teacher } = app.models;

  const teachers = await Teacher.getActive();

  const duplicatedTeacher = find(teachers, { fullName });

  if (duplicatedTeacher) {
    if (!id || (id && duplicatedTeacher.id.toString() !== id)) {
      throw new Forbidden('"fullName" for teacher should be uniq!');
    }
  }
};
