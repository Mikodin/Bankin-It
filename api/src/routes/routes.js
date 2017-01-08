var express = require('express');
var router = express.Router();

var User = require('../models/user.model');
var UserController = require('../controllers/user.controller')(User);

router.get('/api/', function(req, res) {
  res.send('Hello From API');
});

router.get('/api/user', UserController.GetUsers);
router.get('/api/user/:userId', UserController.GetUser);
router.post('/api/user', UserController.AddUser);
router.delete('/api/user/:userId', UserController.DeleteUser);

module.exports = router;
