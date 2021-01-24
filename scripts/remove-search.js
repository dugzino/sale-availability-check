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

prompt.get(properties, function (err, results) {
  if (err) { return onErr(err); }

  fs.readFile(files.searchParams.schema, (err, data) => {
    const { schema } = JSON.parse(data);
    console.log('TCL:  ~ file: remove-search.js ~ line 25 ~ fs.readFile ~ schema', schema);

    if (!schema.length) {
      logger("File doesn't have any searches stored yet. Start by using 'npm run add-service'.", 'error');
    } else if (schema.some(({ articleName }) => articleName === results.articleName)) {
      deleteArticle(results, schema);
    } else {
      logger("Couldn't find the article you're trying to remove.", 'error');
    }
  })
});

const deleteArticle = (results, schema) => {
  const newSchema = schema.filter(({ articleName }) => articleName !== results.articleName);
  const data = JSON.stringify({ schema: newSchema }, null, 2);

  fs.writeFile(files.searchParams.schema, data, (err) => {
    if (err) logger("Hmmm it seems something went wrong! Create an issue on Github, please.", 'error');
    logger("Article removed successfully!", 'error');
  })
}
