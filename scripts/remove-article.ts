import readline from 'readline';
import fs from 'fs';

import { logger } from '../src/utils';
import { files } from './utils';

import { ISearchSchemaItem, SearchSchemaType } from '../src/config/schema.types';

type questionsType = Array<{ prop: string; question: string }>;
const questions: questionsType = [
  {
    prop: 'articleName',
    question: 'Want to remove an article? Type its name. eg: "3080 RTX"',
  },
];


questions.forEach(({ question }) => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  rl.question('\x1b[33m' + question + '?\x1b[0m\n', (answer: string) => {
    fs.readFile(files.searchParams.schema, (error, data: any) => {
      const { schema } = JSON.parse(data);

      if (!schema.length) {
        logger("File doesn't have any searches stored yet. Start by using 'npm run add-service'.", 'error');
      } else if (schema.some(({ articleName }) => articleName === answer)) {
        deleteArticle(answer, schema);
      } else {
        logger("Couldn't find the article you're trying to remove.", 'error');
      }
      rl.close();
    });
  });
});

const deleteArticle = (answer: string, schema: Array<ISearchSchemaItem>) => {
  const newSchema = schema.filter(({ articleName }) => articleName !== answer);
  const data = JSON.stringify({ schema: newSchema }, null, 2);

  fs.writeFile(files.searchParams.schema, data, (err) => {
    if (err) logger("Hmmm it seems something went wrong! Create an issue on Github, please.", 'error');
    logger('Article removed successfully!', 'error');
  })
}
