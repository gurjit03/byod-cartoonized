const express = require('express');
const router = express.Router();

// HOME PAGE
router.get('/', function(req, res) {
  const filename = req.query.filename;
  res.send(filename ? filename : "Please add the filename in the query param to continue")
});

module.exports = router;
