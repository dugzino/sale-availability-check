const fs = require('fs');

const { logger } = require('../src/utils');

const files = {
  searchParams: {
    fileName: './src/config/search-params.js',
    importDir: ({ fileName }) => `../websites-services/${fileName}`,
  },
}

const deleteFile =() => {
  logger("So you want to delete the file, huh? Let's delete it.", 'warn');

  fs.unlink(files.searchParams.fileName, (err) => {
    if (err) { return logger("Hmmm file doesn't exist yet. So nothing happened.", 'warn'); }
    logger("File deleted successfully!", 'error');
  });
}

const onErr =(err) => {
  logger(err, 'error');
  return 1;
}

module.exports = {
  files,
  deleteFile,
  onErr,
}
