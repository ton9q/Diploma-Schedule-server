const { pick } = require('lodash');
const filterFields = require('../../common/hooks/filter_fields');

module.exports = async context => {
  await filterFields([
    'semesterNumber',
    'daysOfWeek',
    'groupId',
  ])(context);

  context.args.data.daysOfWeek = context.args.data.daysOfWeek.map(({ dayOfWeekName, subjects }) => {
    const filteredSubjects = subjects.map(subject => {
      return pick(subject, [
        'name',
        'type',
        'teacherId',
        'cabinet',
        'buildingNumber',
        'weekNumber',
        'partOfGroup',
        'lessonStart',
        'lessonEnd',
        'date',
      ]);
    });

    return {
      dayOfWeekName,
      subjects: filteredSubjects,
    };
  });
};
