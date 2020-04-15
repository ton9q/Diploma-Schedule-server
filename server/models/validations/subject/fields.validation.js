const { isArray } = require('lodash');


module.exports = (subject, raise) => {
  const {
    name,
    type,
    cabinet,
    buildingNumber,
    weekNumber,
    lessonStart,
    lessonEnd,
    date,
  } = subject;

  //   some validation

  //   if (!isArray(questions)) {
  //     raise('"questions" must be an array');
  //   }

//   if (questions.length === 0) {
//     raise('"questions" must contain at least 1 item');
//   }
};
