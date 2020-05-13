const { MONTH_BEGINNING_FIRST_SEMESTER } = require('../../common/constants/moths_beginning_of_semesters');

function getStartYear(groupName) {
  return `20${groupName.slice(-2)}`;
}

function getSemesterNumberInYear(date) {
  const month = date.getMonth() + 1;

  if (month >= MONTH_BEGINNING_FIRST_SEMESTER) {
    return 1;
  }

  return 2;
}

function getSemesterNumber({ groupName, date }) {
  const startYear = getStartYear(groupName);
  const dateYear = date.getFullYear();
  const yearDifference = dateYear - startYear;
  const semesterNumberInYear = getSemesterNumberInYear(date);

  if (semesterNumberInYear === 1) {
    return yearDifference * 2 + 1;
  }

  return yearDifference * 2;
}

module.exports = {
  getSemesterNumber,
};
