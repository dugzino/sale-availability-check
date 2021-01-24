const colors = require('colors');

const loggerStyle = {
  info: { color: 'white' },
  warn: { color: 'yellow' },
  error: { color: 'red' },
  success: { color: 'green' },
}

// Utils
const urlBuilder = (url, path) => `${url}${path}`;

const articleAvailability = (articleName, url, isAvailable) => {
  const logType = isAvailable ? 'success' : 'error';
  logger(url, logType, `${articleName} -`);
}

const logger = (string, logType = 'info', preString) => {
  const { color } = loggerStyle[logType];
  if (preString) return console.log(preString, string[color]);
  console.log(string[color]);
}

module.exports = {
  articleAvailability,
  logger,
  urlBuilder,
}
