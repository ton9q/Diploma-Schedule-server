const { createLogger, format, transports } = require('winston');
const formatLog = require('./format');
const getModulePath = require('./get_module_path');
// const formatDate = require('../utils/format_date');

const getFormatConfig = ({ label, toFile = false } = {}) => {
  return format.combine(
    toFile ? format.uncolorize() : format.colorize(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.label({ label }),
    format.printf(formatLog)
  );
};

module.exports = (module, { label = getModulePath(module) } = {}) => {
  const level = process.env.NODE_ENV === 'development' ? 'silly' : 'info';
  //   const date = formatDate({ date: new Date(), accuracy: 'day' });

  return createLogger({
    level,
    format: getFormatConfig({ label }),
    transports: [
      new transports.Console({
        // level: 'silly',
      }),
    //   new transports.File({
    //     filename: `logs/all_${date}.log`,
    //     level: 'silly',
    //     format: getFormatConfig({ label, toFile: true }),
    //   }),
    //   new transports.File({
    //     filename: `logs/error_${date}.log`,
    //     level: 'error',
    //     format: getFormatConfig({ label, toFile: true }),
    //   }),
    ],
  });
};
