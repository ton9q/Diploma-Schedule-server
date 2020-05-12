const { UnprocessableEntity } = require('http-errors');
const app = require('../../../server');

module.exports = async context => {
  const { faculty, specialty, numberSemesters } = context.args.data;
  const { University } = app.models;

  const university = await University.getCurrent();

  const existedFaculty = university.faculties.find(({ name }) => name === faculty);
  if (!existedFaculty) {
    throw new UnprocessableEntity(`"faculty" = "${faculty}" not founded in university`);
  }

  const existedSpecialty = existedFaculty.specialties.find(({ name }) => name === specialty);
  if (!existedSpecialty) {
    throw new UnprocessableEntity(`"specialty" = "${specialty}" not founded on ${faculty} faculty in university`);
  }

  if (existedSpecialty.numberSemesters !== numberSemesters) {
    throw new UnprocessableEntity(`Invalid "numberSemesters" for ${specialty} specialty`);
  }
};
