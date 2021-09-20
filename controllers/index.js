const applyFilters = require('../utils/apply-filter');

async function uploadFileController(req, res) {
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
        await applyFilters(uploadedFile.filename);
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

module.exports = uploadFileController;
