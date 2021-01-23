const prompt = require('prompt');
const fs = require('fs');
const colors = require("colors");

const { files, deleteFile, onErr } = require('./utils');

// TODO
// console.log(`PS: As we only have RueDuCommerce for now, whatever you input, it'll be for a search on RDC.`.yellow);

const properties = [
  {
    name: 'articleName',
    type: 'string',
    replace: '',
    description: 'Want to remove an article? Type its name or leave empty to remove all. eg: "3080 RTX"',
  },
];

prompt.message = '';
prompt.delimiter = ':\n';

prompt.start();

prompt.get(properties, function (err, { articleName }) {
  if (err) { return onErr(err); }

  if (!articleName) return deleteFile();
  fs.readFile(files.searchParams.fileName, (err, data) => {
    if (!data.toString().includes(results.articleName)) console.log("Couldn't find the article you're trying to remove.");
    deleteArticle(articleName, data)
  });
});

const deleteArticle = (articleName, data) => {
  return console.log("Not yet implemented! Soon...".red);
}
