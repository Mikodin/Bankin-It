var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('Hello World');
});

router.post('/user', function(req, res) {
  res.json(req.body);
});

module.exports = router;
