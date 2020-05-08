const setNestedFieldIds = require('./set_nested_field_ids');

module.exports = async ({ Model: Timetable, instance, data }) => {
  const timetable = instance || data;

  setNestedFieldIds({ timetable, Timetable });
};
