const prompt = require('prompt');
const fs = require('fs');

const { logger } = require('../src/utils');
const { onErr, files } = require('./utils');

prompt.start();

prompt.get([], function (err, results) {
  if (err) { return onErr(err); }

  logger("So you want to delete the file, huh? Let's delete it.", 'warn');

  fs.writeFile(files.searchParams.module, '', (err) => {
    if (err) logger("Hmmm it seems something went wrong! Create an issue on Github, please.", 'error');
    logger("search-params file cleaned successfully!", 'success');
  });

  const schema = JSON.stringify({ schema: [] }, null, 2);

  fs.writeFile(files.searchParams.schema, schema, (err) => {
    if (err) logger("Hmmm it seems something went wrong! Create an issue on Github, please.", 'error');
    logger("Searches cleaned successfully!", 'success');
  });
});
