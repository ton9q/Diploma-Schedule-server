const app = require('../../../../server');
const { embedTeacherToTimetables } = require('../../../../services/embed_teacher.service');

module.exports = async (groupName, date) => {
  const { Timetable, Group } = app.models;

  const group = await Group.findOne({ where: { groupName, isArchived: false } });

  const timetables = await Timetable.find({
    where: {
      groupId: group.id,
    },
    include: [
      'group',
    ],
  });

  return embedTeacherToTimetables(timetables);
};
