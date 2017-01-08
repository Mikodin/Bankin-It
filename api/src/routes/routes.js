var express = require('express');
var router = express.Router();

var User = require('../models/user.model');
console.log(User);
var UserController = require('../controllers/user.controller')(User);


router.get('/api/', function(req, res) {
  res.send('Hello From API');
});

router.post('/api/user', UserController.PostUser);

module.exports = router;
