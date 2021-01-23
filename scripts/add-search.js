const prompt = require('prompt');
const fs = require('fs');
const colors = require("colors");

const { files } = require('./utils');

const stringToSplit = '];'; // This is used as a marker as to where to add the new search.

// TODO
// console.log(`PS: As we only have RueDuCommerce for now, whatever you input, it'll be for a search on RDC.`.yellow);

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
  console.log(err);
  return 1;
}

const createFile = (results) => {
  console.log("Hmm, the file doesn't exist yet. Let's create it, shall we?".yellow);

  return fs.writeFile(
    files.searchParams.fileName,
    fileBuilder(results),
    (err) => {
      if (err) { return console.error(err); }
      console.log("File created successfully!".green);
    }
  );
}

const editFile = ({ articleName, search }, data) => {
  console.log("Noice! The file already exists. Let's add the new search!".yellow);

  const splittedData = data.split(stringToSplit);
  const newData = `${splittedData[0]}  { articleName: '${articleName}', search: '${search}' },\n${stringToSplit}${splittedData[1]}`;

  fs.writeFile(
    files.searchParams.fileName,
    newData,
    (err) => {
      if (err) { return console.error(err); }
      console.log("New search added successfully!".green);
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
