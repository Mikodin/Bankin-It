var express = require('express');
var router = express.Router();

router.get('/', function(req,res) {
  res.send('Hello world');
});

router.post('/user/login', function(req, res) {
  console.log(req);
  res.json({id:req.body.id, password:req.body.password});
})

module.exports = router;
