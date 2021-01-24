const colors = require('colors');

const loggerStyle = {
  info: { color: 'white', bg: 'bgBlack' },
  warn: { color: 'yellow', bg: 'bgBlack' },
  error: { color: 'red', bg: 'bgBlack' },
  success: { color: 'green', bg: 'bgBlack' },
}

// Utils
const urlBuilder = (url, path) => `${url}${path}`;

const articleAvailability = (articleName, url, isAvailable) => {
  const logType = isAvailable ? 'success' : 'error';
  logger(url, logType, `${articleName} -`);
}

const logger = (string, logType = 'info', preString) => {
  const { color, bg } = loggerStyle[logType];
  if (preString) return console.log(preString, string[color][bg]);
  console.log(string[color][bg]);
}

module.exports = {
  articleAvailability,
  logger,
  urlBuilder,
}
