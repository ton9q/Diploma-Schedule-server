const { uniq, map, forEach } = require('lodash');
const app = require('../server');

async function embedTeacherToTimetables (timetables) {
  const teacherIds = [];

  forEach(timetables, (({ daysOfWeek }) => {
    forEach(daysOfWeek, (({ subjects }) => {
      forEach(subjects, (({ teacherId }) => {
        teacherIds.push(teacherId);
      }));
    }));
  }));

  const uniqTeacherIds = uniq(teacherIds);

  const { Teacher } = app.models;

  const teachers = await Teacher.find({ where: { id: { inq: uniqTeacherIds } } });
  const findTeacher = teacherId => teachers.find(({ id }) => id.equals(teacherId));

  return map(timetables, (timetable => {
    const timetableJSON = timetable.toJSON();
    const { daysOfWeek } = timetableJSON;

    const newDaysOfWeek = map(daysOfWeek, (dayOfWeek => {
      const { subjects } = dayOfWeek;

      const newSubjects = map(subjects, (subject => {
        const { teacherId } = subject;
        const teacher = findTeacher(teacherId);
        return { ...subject, teacher };
      }));

      return { ...dayOfWeek, subjects: newSubjects };
    }));

    return { ...timetableJSON, daysOfWeek: newDaysOfWeek };
  }));
}

module.exports = {
  embedTeacherToTimetables,
};
