const app = require('../server');
const { embedTeacherToTimetables } = require('./embed_teacher.service');
const { getSemesterNumber } = require('./timetable_info.service');
const { LESSONS, EXAMS } = require('../../common/constants/timetable_inclusions');
const { LECTURE, PRACTICE, LABORATORY, EXAM, CONSULTATION } = require('../../common/constants/subject_lesson_types');

const SUBJECT_LESSONS = [LECTURE, PRACTICE, LABORATORY];
const SUBJECT_EXAMS = [EXAM, CONSULTATION];

async function getTimetables({ groupName, date, includeOnly }) {
  const { Timetable, Group } = app.models;

  const group = await Group.findOne({ where: { groupName, isArchived: false } });

  const filter = {
    where: {
      groupId: group.id,
    },
    include: [
      'group',
    ],
  };

  if (date) {
    const semesterNumber = getSemesterNumber({ groupName, date });
    filter.where.semesterNumber = semesterNumber;
  }

  const timetables = await Timetable.find(filter);

  if (includeOnly === LESSONS) {
    const lessons = timetables.filter(timetable => {
      const timetableJSON = timetable.toJSON();
      const firstTimetableSubject = timetableJSON.daysOfWeek[0].subjects[0];
      return SUBJECT_LESSONS.includes(firstTimetableSubject.type);
    });
    return embedTeacherToTimetables(lessons);
  }

  if (includeOnly === EXAMS) {
    const exams = timetables.filter(timetable => {
      const timetableJSON = timetable.toJSON();
      const firstTimetableSubject = timetableJSON.daysOfWeek[0].subjects[0];
      return SUBJECT_EXAMS.includes(firstTimetableSubject.type);
    });
    return embedTeacherToTimetables(exams);
  }

  return embedTeacherToTimetables(timetables);
}

module.exports = {
  getTimetables,
};
