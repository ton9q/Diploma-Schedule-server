const app = require('../../../../server');

const DEFAULT_ORDER = 'createdAt DESC';

module.exports = async (group, page, pageSize) => {
  const { ArchivedTimetable } = app.models;

  const filter = { include: ['creator', 'archiver', 'group'], where: {} };

  if (group) {
    const indexGroupInclusion = filter.include.indexOf('group');
    filter.include[indexGroupInclusion] = {
      relation: 'group',
      scope: {
        where: { groupName: group },
      },
    };
  }

  if (page && pageSize) {
    filter.skip = (page - 1) * pageSize;
    filter.limit = pageSize;
  }

  filter.order = DEFAULT_ORDER;

  const archivedTimetableCount = await ArchivedTimetable.count(filter);
  const archivedTimetables = await ArchivedTimetable.find(filter);

  return {
    timetableCount: archivedTimetableCount,
    timetables: archivedTimetables,
  };
};
