const { NotFound } = require('http-errors');
const app = require('../../../../server');

module.exports = async(timetableId, currentUserId) => {
  const { Timetable, ArchivedTimetable } = app.models;

  const timetable = await Timetable.findById(timetableId);
  if (!timetable) {
    throw new NotFound(`Timetable id="${timetableId} not found"`);
  }

  await ArchivedTimetable.create({
    archivedBy: currentUserId,
    archivedAt: new Date(),
    ...timetable.toJSON(),
  });

  await Timetable.deleteById(timetableId);

  return {};
};
