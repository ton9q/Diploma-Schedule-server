// const filterInputFields = require('./filter_input_fields');
const setNestedFieldIds = require('./set_nested_field_ids');

module.exports = async ({ Model: Timetable, instance, data }) => {
  const timetable = instance || data;

  //   filterInputFields({ timetable });
  setNestedFieldIds({ timetable, Timetable });
};
