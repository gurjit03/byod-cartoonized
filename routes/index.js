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
        const convertedFilepath = path.resolve(
          './',
          'public',
          'images',
          `${filenameWithoutExtension}.${fileExtension}`
        );
        const convertedFilepath = file + '-converted';
        // create cartoonized version of the image added in the query param
        await execShellCommand(
          `convert ${filepath} -kuwahara RadiusxSigma resultimage`
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
      : 'Please add the filename in the query param to continue'
  );
});

module.exports = router;
