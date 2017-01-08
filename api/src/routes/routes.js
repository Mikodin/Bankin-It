var express = require('express');
var router = express.Router();

var User = require('../models/user.model');
var UserController = require('../controllers/user.controller')(User);

router.get('/api/', function(req, res) {
  res.send('Hello From API');
});

router.get('/api/user', UserController.GetUsers);
router.post('/api/user', UserController.AddUser);

module.exports = router;
