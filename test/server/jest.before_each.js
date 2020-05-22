const describeSilent = require('./utils/describe_silent');

describe.silent = describeSilent;

jest.setTimeout(30000);
