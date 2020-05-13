const { getTimetables } = require('../../../../services/timetable_search.service');
const { LESSONS } = require('../../../../../common/constants/timetable_inclusions');

module.exports = async (groupName, date) => {
  return getTimetables({
    groupName,
    date,
    includeOnly: LESSONS,
  });
};
