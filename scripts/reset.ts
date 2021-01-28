import readline from 'readline';
import fs from 'fs';

import { logger } from '../src/utils';
import { files } from './utils';

type questionType = { question: string };
const question: questionType = { question: 'Are you sure you want to reset your searches?' };

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question('\x1b[33m' + question.question + '?\x1b[0m\n', (answer: string) => {
  if (answer.includes('n')) logger("Cool, you can use me anytime.", 'warn')

  logger("So you want to reset it all, huh? Let's go.", 'warn');

  fs.writeFile(files.searchParams.module, '', (err) => {
    if (err) logger("Hmmm it seems something went wrong! Create an issue on Github, please.", 'error');
    logger("search-params file cleaned successfully!", 'success');
  });

  const schema = JSON.stringify({ schema: [] }, null, 2);

  fs.writeFile(files.searchParams.schema, schema, (err) => {
    if (err) logger("Hmmm it seems something went wrong! Create an issue on Github, please.", 'error');
    logger("Searches cleaned successfully!", 'success');
  });

  rl.close();
});
