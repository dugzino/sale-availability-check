const { colors } = require("prompt");
const fs = require('fs');

const files = {
  searchParams: {
    fileName: './src/config/search-params.js',
    importDir: ({ fileName }) => `../websites-services/${fileName}`,
  },
}

const deleteFile =() => {
  console.log("So you want to delete the file, huh? Let's delete it.".yellow);

  fs.unlink(files.searchParams.fileName, (err) => {
    if (err) { return console.log("Hmmm file doesn't exist yet. So nothing happened.".yellow); }
    console.log("File deleted successfully!".red);
  });
}

const onErr =(err) => {
  console.log(err);
  return 1;
}

module.exports = {
  files,
  deleteFile,
  onErr,
}
