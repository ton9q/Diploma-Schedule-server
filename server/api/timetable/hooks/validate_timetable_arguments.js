const { uniq } = require('lodash');
const { NotFound, Unprocessable } = require('http-errors');
const app = require('../../../server');

module.exports = async context => {
  const { groupId, semesterNumber, daysOfWeek } = context.args.data;
  const { Group, Teacher } = app.models;

  const group = await Group.findById(groupId);
  if (!group) {
    throw new NotFound(`Group with id="${groupId}" not found`);
  }

  if (semesterNumber > group.numberSemesters) {
    throw new Unprocessable(`Invalid value of "semesterNumber"=${semesterNumber}`);
  }

  const teacherIds = [];
  daysOfWeek.forEach(({ subjects }) => {
    subjects.forEach(({ teacherId }) => {
      teacherIds.push(teacherId);
    });
  });

  const uniqTeacherIds = uniq(teacherIds);
  const teachers = await Teacher.find({ where: { id: { inq: uniqTeacherIds } } });
  if (uniqTeacherIds.length !== teachers.length) {
    throw new Unprocessable('Subjects contain invalid some teacherId');
  }
};
