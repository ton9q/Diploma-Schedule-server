const { UnprocessableEntity } = require('http-errors');
const { isArray, isNumber, isObject, xor, map } = require('lodash');
const FACULTY_KEYS = Object.keys(require('../../../../models/university.json').properties.faculties.type[0]);

module.exports = async context => {
  const { faculties } = context.args;

  if (!isArray(faculties)) {
    raise('"faculties" must be an array');
  }

  if (faculties.length === 0) {
    raise('"faculties" cannot be an empty array');
  }

  validateValuesUniqueness({
    options: faculties,
    path: 'faculties',
  });

  faculties.forEach((faculty, facultyIndex) => {
    const facultiesIncludeAllRequiredProperties = xor(FACULTY_KEYS, Object.keys(faculty)).length === 0;

    if (!facultiesIncludeAllRequiredProperties) {
      raise('"faculties" must include all properties');
    }

    if (typeof faculty.name !== 'string') {
      raise(`"faculties[${facultyIndex}].name" must be a string`);
    }

    if (!isArray(faculty.specialties)) {
      raise(`"faculties[${facultyIndex}].specialties" must be an array`);
    }

    if (faculty.specialties.length === 0) {
      raise(`"faculties[${facultyIndex}].specialties" cannot be an empty array`);
    }

    validateValuesUniqueness({
      options: faculty.specialties,
      path: `faculties[${facultyIndex}].specialties`,
    });

    faculty.specialties.forEach((specialty, specialtyIndex) => {
      const specialtyIncludeAllRequiredProperties =
        xor(['name', 'numberSemesters'], Object.keys(specialty)).length === 0;

      if (!specialtyIncludeAllRequiredProperties) {
        raise(`"faculties[${facultyIndex}].specialties[${specialtyIndex}]" must include all properties`);
      }

      if (typeof specialty.name !== 'string') {
        raise(`"faculties[${facultyIndex}].specialties[${specialtyIndex}].name" must be a string`);
      }

      if (!isNumber(specialty.numberSemesters)) {
        raise(`"faculties[${facultyIndex}].specialties[${specialtyIndex}].numberSemesters" must be a number'`);
      }

      if (specialty.numberSemesters <= 0) {
        raise(`"faculties[${facultyIndex}].specialties[${specialtyIndex}].numberSemesters" must be more 0'`);
      }
    });
  });
};

function validateValuesUniqueness({ options, path }) {
  const optionValues = options.every(isObject) ? map(options, 'name') : options;

  if (containDuplicates(optionValues)) {
    raise(`"${path}" contain duplicates`);
  }
}

function containDuplicates(array) {
  const uniqElements = new Set(array);
  return uniqElements.size < array.length;
}

function raise(message) {
  throw new UnprocessableEntity(`Invalid "faculties" argument: ${message}`);
}
