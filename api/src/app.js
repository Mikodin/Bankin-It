var express = require('express');
var app = express();

app.get('/notes', function(req, res) {
  res.json({UpAndRunning: true});
})

app.listen(8080);
