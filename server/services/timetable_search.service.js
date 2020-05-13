const app = require('../server');
const { embedTeacherToTimetables } = require('./embed_teacher.service');
const { getSemesterNumber } = require('./timetable_info.service');

async function getTimetables(groupName, date) {
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

  return embedTeacherToTimetables(timetables);

}

module.exports = {
  getTimetables,
};
