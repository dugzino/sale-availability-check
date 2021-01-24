const prompt = require('prompt');
const fs = require('fs');

const { files, onErr } = require('./utils');
const { logger } = require('../src/utils');

const properties = [
  {
    name: 'articleName',
    type: 'string',
    description: 'Want to remove an article? Type its name. eg: "3080 RTX"',
  },
];

prompt.message = '';
prompt.delimiter = ':\n';

prompt.start();

prompt.get(properties, function (err, { articleName }) {
  if (err) { return onErr(err); }

  fs.readFile(files.searchParams.fileName, (err, data) => {
    if (!data) {
      return logger("File doesn't exist yet. Start by using 'npm run add-service' before considering removing a service.", 'error');
    }
    if (!data.toString().includes(results.articleName)) {
      return logger("Couldn't find the article you're trying to remove.", 'error');
    }
    deleteArticle(articleName, data)
  });
});

const deleteArticle = (articleName, data) => {
  return logger("Sorry, but it's not yet implemented!", 'error');
}
