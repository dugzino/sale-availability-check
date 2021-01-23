const colors = require('colors');

// Utils
const urlBuilder = (url, path) => `${url}${path}`;

const articleAvailability = (articleName, url, isAvailable) => {
  const color = isAvailable ? 'green' : 'red';
  console.log(`${articleName} -`, `${url}`[color]);
}

module.exports = {
  articleAvailability,
  urlBuilder,
}
