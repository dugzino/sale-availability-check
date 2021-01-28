import readline from 'readline';
import fs from 'fs';

import { logger } from '../src/utils';
import { files } from './utils';

type questionsType = Array<{ prop: string; question: string }>;
const questions: questionsType = [
  {
    prop: 'articleName',
    question: 'Add the name of the article you\'re looking for. eg: "3080 RTX"',
  },
  {
    prop: 'search',
    question: 'Consider this as typing your search on the website directly. eg: "3080 rtx 10go"',
  },
];

interface IAnswers { articleName: string; search: string; website?: string };
let answers: IAnswers = { articleName: '', search: '' };

let rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const question1 = () => new Promise((resolve) => {
  rl.question('\x1b[33m' + questions[0].question + '?\x1b[0m\n', (answer: string) => {
    answers[questions[0].prop] = answer;
    resolve('');
  });
});

const question2 = () => new Promise((resolve) => {
  rl.question('\x1b[33m' + questions[1].question + '?\x1b[0m\n', (answer: string) => {
    answers[questions[1].prop] = answer;

    fs.readFile(files.searchParams.schema, (error, data: any) => {
      const { schema } = JSON.parse(data);

      if (!schema || !schema.length) createFile();
      else editFile();
    });
    resolve('');
  });
});

const main = async () => {
  await question1();
  await question2();
  rl.close();
}

main();

const createFile = () => {
  logger("Hmm, the file doesn't exist yet. Let's create it, shall we?", 'warn');

  fs.writeFile(files.searchParams.module, fileBuilder(answers), (err) => {
    if (err) { return console.error(err); }
    logger("File created successfully!", 'success');
  });

  const schema = JSON.stringify({ schema: [ answers ] }, null, 2);
  fs.writeFile(files.searchParams.schema, schema, (err) => {
    if (err) logger("Hmmm it seems something went wrong! Create an issue on Github, please.", 'error');
    logger("Schema created successfully!", 'success');
  });
}

const editFile = () => {
  logger("Noice! The file already exists. Let's add the new search!", 'warn');

  fs.readFile(files.searchParams.schema, (err, data: any) => {
    const { schema } = JSON.parse(data);
    const newSchema = JSON.stringify({ schema: [ ...schema, answers ] }, null, 2);

    fs.writeFile(files.searchParams.schema, newSchema, (err) => {
      if (err) { return console.error(err); }
      logger("New search added successfully!", 'success');
    })
  })
}

const fileBuilder = ({ website = 'rue du commerce' }): string => {
  const _website = getWebsiteName(website);
  return `const { ${_website.className} } = require('${files.searchParams.importDir(_website)}');
const data = require('./search-params.schema.json');

module.exports = {
  websiteService: new ${_website.className}(data.schema),
}`;
}

const getWebsiteName = (input: string): { className: string, fileName: string } => {
  if (input.includes('commerce')) return { className: 'RueDuCommerce', fileName: 'rue-du-commerce' };
  logger('yikes!', 'error');
  rl.close();
}
