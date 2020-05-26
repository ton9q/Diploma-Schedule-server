module.exports = [{
  description: 'when no param is set',
  searchParams: {},
  groups: [{}, {}, {}],
  expectedIndexes: [0, 1, 2],
}, {
  description: 'when "faculty" param is set',
  searchParams: {
    faculty: 'faculty_1',
  },
  groups: [{
    faculty: 'faculty_2',
  }, {
    faculty: 'faculty_1',
  }, {
    faculty: 'faculty_1',
  }],
  expectedIndexes: [1, 2],
}, {
  description: 'when "specialty" param is set',
  searchParams: {
    specialty: 'specialty_1',
  },
  groups: [{
    specialty: 'specialty_1',
  }, {
    specialty: 'specialty_1',
  }, {
    specialty: 'specialty_2',
  }],
  expectedIndexes: [0, 1],
}];
