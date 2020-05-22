const { getRegExp } = require('../../../../server/utils/regexp');

const cases = [{
  inputString: 'a.b',
  options: undefined,
  expectedRegExp: /^a\.b$/,
}, {
  inputString: 'a.b',
  options: {},
  expectedRegExp: /^a\.b$/,
}, {
  inputString: 'a.b',
  options: {
    exactMatch: false,
  },
  expectedRegExp: /a\.b/,
}, {
  inputString: 'a.b',
  options: {
    exactMatch: true,
  },
  expectedRegExp: /^a\.b$/,
}, {
  inputString: 'a.b',
  options: {
    caseSensitive: false,
  },
  expectedRegExp: /^a\.b$/i,
}, {
  inputString: 'a.b',
  options: {
    caseSensitive: true,
  },
  expectedRegExp: /^a\.b$/,
}, {
  inputString: 'a.b',
  options: {
    exactMatch: false,
    caseSensitive: false,
  },
  expectedRegExp: /a\.b/i,
}];

describe('RegExp utils', () => {
  describe('getRegExp', () => {
    cases.forEach(({ inputString, options, expectedRegExp }) => {
      describe(`when inputString="${inputString}" and options=${JSON.stringify(options)}`, () => {
        it('returns correct RegExp', () => {
          expect(getRegExp(inputString, options)).toEqual(expectedRegExp);
        });
      });
    });
  });
});
