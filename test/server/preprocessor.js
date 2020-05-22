// Workaround for requiring Loopback app in Jest tests.
// Module `loopback-boot` checks file extensions to be defined in `require.extensions`.
// `require.extensions` object is deprecated and Jest doesn't provide it.
// Thus this object should be provided during Jest preprocessor processing.

const process = src => `
  require.extensions = { 
    '.js': () => {}, 
    '.json': () => {}, 
    '.node': () => {},  
    '.ejs': () => {}
  };
  ${src}
`;

module.exports = {
  process,
};
