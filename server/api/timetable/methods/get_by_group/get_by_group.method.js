const app = require('../../../../server');

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

  return timetables;
};
