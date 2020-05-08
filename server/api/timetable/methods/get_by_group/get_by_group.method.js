const app = require('../../../../server');
const { embedTeacherToTimetables } = require('../../../../services/embed_teacher.service');

module.exports = async (group, date) => {
  const { Timetable } = app.models;

  const timetables = await Timetable.find({
    include: [
      {
        relation: 'group',
        scope: {
          where: { groupName: group },
        },
      },
    ],
  });

  return embedTeacherToTimetables(timetables);
};
