const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs').promises;
const upload = require('../lib/multer');
const applyFilters = require('../utils/apply-filter');

router.post(
  '/upload',
  upload.single('uploadedFile'),
  async function (req, res) {
    try {
      const uploadedFile = req.file;

      // make sure file is available
      if (!uploadedFile) {
        res.status(400).send({
          status: false,
          data: 'No file is selected.',
        });
      } else {
        try {
          await applyFilters(uploadedFile.originalname);
        } catch (error) {
          res.status(500).send('File not available on the server');
        }

        // send response
        res.status(200).send({
          message: 'File is uploaded.',
          data: {
            name: uploadedFile.originalname,
            mimetype: uploadedFile.mimetype,
            size: uploadedFile.size,
          },
        });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

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
