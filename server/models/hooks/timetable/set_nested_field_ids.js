const forEachSafe = require('../../../utils/for_each_safe');

module.exports = ({ timetable, Timetable }) => {
  const ObjectId = Timetable.getDataSource().ObjectID;

  const setId = object => {
    if (!object.id) {
      object.id = ObjectId();
    }
  };

  forEachSafe(timetable.daysOfWeek, dayOfWeek => {
    setId(dayOfWeek);

    forEachSafe(dayOfWeek.subjects, subject => {
      setId(subject);
    });
  });
};
