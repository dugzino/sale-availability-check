const prompt = require('prompt');

const { deleteFile, onErr } = require('./utils');

prompt.start();

prompt.get([], function (err, results) {
  if (err) { return onErr(err); }

  deleteFile();
});
