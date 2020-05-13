const { getTimetables } = require('../../../../services/timetable_search.service');

module.exports = async (groupName, date) => {
  return getTimetables(groupName, date);
};
