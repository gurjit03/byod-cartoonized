const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, path.join(__dirname, '../public/uploads/'));
  },
  filename(_req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
  },
});

const upload = multer({ storage });
module.exports = upload;
