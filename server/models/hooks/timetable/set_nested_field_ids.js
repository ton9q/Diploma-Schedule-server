const { forEach } = require('lodash');

module.exports = ({ timetable, Timetable }) => {
  const ObjectId = Timetable.getDataSource().ObjectID;

  const setId = object => {
    if (!object.id) {
      object.id = ObjectId();
    }
  };

  forEach(timetable.daysOfWeek, dayOfWeek => {
    setId(dayOfWeek);

    forEach(dayOfWeek.subjects, subject => {
      setId(subject);
    });
  });
};
