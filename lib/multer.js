const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(
      path.resolve(__dirname, '../public/uploads/'),
      'PATH .JOIN....'
    );
    cb(null, path.join(__dirname, '../public/uploads/'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
