const express = require('express');
const router = express.Router();
const uploadFileController = require('../controllers');
const upload = require('../lib/multer');

router.post('/upload', upload.single('uploadedFile'), uploadFileController);

module.exports = router;
