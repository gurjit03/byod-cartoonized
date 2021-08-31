const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs').promises;
const execShellCommand = require('../utils/exec-shell-command');

// HOME PAGE
router.get('/', async function (req, res) {
  const filename = req.query.filename;
  res.setHeader('Content-Type', 'text/plain');
  if (filename) {
    const filepath = path.resolve('./', 'public', 'images', filename);
    try {
      const filestats = await fs.stat(filepath);
      if (filestats) {
        const splittedFilename = filename.split('.');
        const filenameWithoutExtension = splittedFilename[0];
        const fileExtension = splittedFilename[1];
        const convertedFilename = `${filenameWithoutExtension}-converted.${fileExtension}`;
        const convertedFilepath = path.resolve(
          './',
          'public',
          'images',
          `${convertedFilename}`
        );
        // create cartoonized version of the image added in the query param
        const convertedFile = await execShellCommand(
          `convert ${filepath} -kuwahara 3 -unsharp 0x2+4+0 ${convertedFilepath}`
        );
        res.send(
          `File has been converted - access it using https://localhost:3000/images/${convertedFilename}`
        );
      }
    } catch (error) {
      console.log(error.message);
      res.send('file is not available on the server');
    }
  }
  res.send(
    filename
      ? filename
      : 'Please add the filename in the query param filename=someFileName.extension to continue'
  );
});

module.exports = router;
