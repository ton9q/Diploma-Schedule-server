module.exports = [{
  description: 'when "faculties" is empty array',
  faculties: [],
}, {
  description: 'when "faculties" is array contains not objects',
  faculties: ['not-object'],
}, {
  description: 'when "faculties" contains item without name',
  faculties: [{
    specialties: [{
      name: 'specialty_11',
      numberSemesters: 7,
    }],
  }],
}, {
  description: 'when "faculties" contains item without specialties',
  faculties: [{
    name: 'faculty_1',
  }],
}, {
  description: 'when "faculties.specialties" is not array',
  faculties: [{
    name: 'faculty_1',
    specialties: 'not-array',
  }],
}, {
  description: 'when "faculties.specialties" is empty array',
  faculties: [{
    name: 'faculty_1',
    specialties: [],
  }],
}, {
  description: 'when "faculties.specialties" is array with contains not objects',
  faculties: [{
    name: 'faculty_1',
    specialties: ['not-object'],
  }],
}, {
  description: 'when "faculties.specialties" is array contains item without name',
  faculties: [{
    name: 'faculty_1',
    specialties: [{
      numberSemesters: 7,
    }],
  }],
}, {
  description: 'when "faculties.specialties" is array contains item without numberSemesters',
  faculties: [{
    name: 'faculty_1',
    specialties: [{
      name: 'specialty_11',
    }],
  }],
}, {
  description: 'when "faculties.specialties" is array contains numberSemesters which not a number',
  faculties: [{
    name: 'faculty_1',
    specialties: [{
      name: 'specialty_11',
      numberSemesters: 'not-number',
    }],
  }],
}, {
  description: 'when "faculties" contains duplicates names',
  faculties: [{
    name: 'faculty_1',
    specialties: [{
      name: 'specialty_11',
      numberSemesters: 7,
    }],
  }, {
    name: 'faculty_1',
    specialties: [{
      name: 'specialty_21',
      numberSemesters: 7,
    }],
  }],
}, {
  description: 'when "faculties.specialties" contains duplicates names in one faculty',
  faculties: [{
    name: 'faculty_1',
    specialties: [{
      name: 'specialty_11',
      numberSemesters: 7,
    }, {
      name: 'specialty_11',
      numberSemesters: 8,
    }],
  }],
}, {
  description: 'when "faculties.specialties" contains duplicates names in separate faculties',
  skip: true,
  faculties: [{
    name: 'faculty_1',
    specialties: [{
      name: 'specialty_11',
      numberSemesters: 7,
    }, {
      name: 'specialty_12',
      numberSemesters: 8,
    }],
  }, {
    name: 'faculty_2',
    specialties: [{
      name: 'specialty_21',
      numberSemesters: 7,
    }, {
      name: 'specialty_12',
      numberSemesters: 8,
    }],
  }],
}];
