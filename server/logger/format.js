module.exports = info => {
  const { timestamp, level } = info;
  const label = getLabel(info);
  const message = getMessage(info);

  return `${timestamp} ${label}${level}: ${message}`;
};

function getLabel(info) {
  return info.label ? `[${info.label}] ` : '';
}

function getMessage(info) {
  if (info instanceof Error) {
    return `${info.message}\n${info.stack}`;
  }

  return info.message;
}
