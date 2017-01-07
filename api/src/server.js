var express = require('express');

var bodyParser = require('body-parser');

var routes = require('./routes/routes.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes);

app.listen(8081, function() {
  console.log('App is listening on localhost:8081');
});

module.exports = app;
