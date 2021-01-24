const { logger } = require('../src/utils');

const files = {
  searchParams: {
    module: './src/config/search-params.js',
    importDir: ({ fileName }) => `../websites-services/${fileName}`,
    schema: './src/config/search-params.schema.json',
  },
}

const onErr =(err) => {
  logger(err, 'error');
  return 1;
}

module.exports = {
  files,
  onErr,
}
