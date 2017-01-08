var express = require('express');
var router = express.Router();

var User = require('../models/user.model');
var UserController = require('../controllers/user.controller')(User);

router.get('/api/', function(req, res) {
  res.send('Hello From API');
});

router.post('/api/user', UserController.PostUser);

module.exports = router;
