const prompt = require('prompt');
const fs = require('fs');

const { logger } = require('../src/utils');
const { files } = require('./utils');

const properties = [
  {
    name: 'articleName',
    type: 'string',
    description: 'Add the name of the article you\'re looking for. eg: "3080 RTX"',
  },
  {
    name: 'search',
    type: 'string',
    description: 'Consider this as typing your search on the website directly. eg: "3080 rtx 10go"',
  },
];

prompt.message = '';
prompt.delimiter = ':\n';

prompt.start();

prompt.get(properties, function (err, results) {
  if (err) { return onErr(err); }

  fs.readFile(files.searchParams.schema, (err, data) => {
    const { schema } = JSON.parse(data);
    if (!schema || !schema.length) { return createFile(results); }
    editFile(results);
  })
});

const onErr = (err) => {
  logger(err, 'error');
  return 1;
}

const createFile = (results) => {
  fs.writeFile(files.searchParams.module, fileBuilder(results), (err) => {
    if (err) { return console.error(err); }
    logger("Hmm, the file doesn't exist yet. Let's create it, shall we?", 'warn');
    logger("File created successfully!", 'success');
  });

  const schema = JSON.stringify({ schema: [ results ] }, null, 2);
  fs.writeFile(files.searchParams.schema, schema, (err) => {
    if (err) logger("Hmmm it seems something went wrong! Create an issue on Github, please.", 'error');
    logger("Schema created successfully!", 'success');
  });
}

const editFile = (results) => {
  logger("Noice! The file already exists. Let's add the new search!", 'warn');

  fs.readFile(files.searchParams.schema, (err, data) => {
    const { schema } = JSON.parse(data);
    const newSchema = JSON.stringify({ schema: [ ...schema, results ] }, null, 2);

    fs.writeFile(files.searchParams.schema, newSchema, (err) => {
      if (err) { return console.error(err); }
      logger("New search added successfully!", 'success');
    })
  })
}

const fileBuilder = ({ website = 'rue du commerce' }) => {
  const _website = getWebsiteName(website);
  return `const { ${_website.className} } = require('${files.searchParams.importDir(_website)}');

module.exports = {
  websiteService: new ${_website.className}(require('./search-params.schema.json')),
}`;
}

const getWebsiteName = (input) => {
  if (input.includes('commerce')) return { className: 'RueDuCommerce', fileName: 'rue-du-commerce' };
  return console.error('yikes!');
}
