const { map, omit } = require('lodash');
const logger = require('../../logger')(module);
const app = require('../../server');
const { getUserId, merge } = require('../utils');
const timetablesData = require('../data/timetables');

module.exports = async () => {
  const { Teacher, Group, Timetable } = app.models;

  logger.info('populate timetables');

  const userId = await getUserId();

  const newTimetablesData = await Promise.all(timetablesData.map(async timetable => {
    const { $groupName, daysOfWeek } = timetable;
    const group = await Group.findOne({ where: { groupName: $groupName } });

    const newDaysOfWeek = await Promise.all(daysOfWeek.map(async dayOfWeek => {
      const { subjects } = dayOfWeek;

      const newSubjects = await Promise.all(subjects.map(async subject => {
        const { $teacherName } = subject;
        const teacher = await Teacher.findOne({ where: { fullName: $teacherName } });

        return {
          ...omit(subject, ['$teacherName']),
          teacherId: teacher.id,
        };
      }));

      return {
        ...dayOfWeek,
        subjects: newSubjects,
      };
    }));

    return {
      ...omit(timetable, ['$groupName']),
      groupId: group.id,
      daysOfWeek: newDaysOfWeek,
    };
  }));

  const wrappedTimetables = map(newTimetablesData, timetable => merge(timetable, { createdBy: userId }));

  await Timetable.create(wrappedTimetables);
};
