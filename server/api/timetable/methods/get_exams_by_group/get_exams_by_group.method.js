const { getTimetables } = require('../../../../services/timetable_search.service');
const { EXAMS } = require('../../../../../common/constants/timetable_inclusions');

module.exports = async (groupName, date) => {
  return getTimetables({
    groupName,
    date,
    includeOnly: EXAMS,
  });
};
