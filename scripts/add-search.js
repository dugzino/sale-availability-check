const prompt = require('prompt');
const fs = require('fs');

const { logger } = require('../src/utils');
const { files } = require('./utils');

const stringToSplit = '];'; // This is used as a marker as to where to add the new search.

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

  fs.readFile(files.searchParams.fileName, (err, data) => {
    if (err) { return createFile(results); }
    editFile(results, data.toString());
  })
});

const onErr = (err) => {
  logger(err, 'error');
  return 1;
}

const createFile = (results) => {
  logger("Hmm, the file doesn't exist yet. Let's create it, shall we?", 'warn');

  return fs.writeFile(
    files.searchParams.fileName,
    fileBuilder(results),
    (err) => {
      if (err) { return console.error(err); }
      logger("File created successfully!", 'success');
    }
  );
}

const editFile = ({ articleName, search }, data) => {
  logger("Noice! The file already exists. Let's add the new search!", 'warn');

  const splittedData = data.split(stringToSplit);
  const newData = `${splittedData[0]}  { articleName: '${articleName}', search: '${search}' },\n${stringToSplit}${splittedData[1]}`;

  fs.writeFile(
    files.searchParams.fileName,
    newData,
    (err) => {
      if (err) { return console.error(err); }
      logger("New search added successfully!", 'success');
    }
  );
}

const fileBuilder = ({ articleName, search, website = 'rue du commerce' }) => {
  const _website = getWebsiteName(website);
  return`const { ${_website.className} } = require("${files.searchParams.importDir(_website)}");

const searchArray = [
  { articleName: '${articleName}', search: '${search}' },
];

module.exports = {
  websiteService: new ${_website.className}(searchArray),
}`;
}

const getWebsiteName = (input) => {
  if (input.includes('commerce')) return { className: 'RueDuCommerce', fileName: 'rue-du-commerce' };
  return console.error('yikes!');
}
