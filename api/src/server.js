var config = require('./config/config');

var express = require('express');
var routes = require('./routes/routes');
var app = express();

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes);

var db;

if (process.env.NODE_ENV === 'test') {
  db = mongoose.connect(config.testDB);
  config.db = config.testDB;
  app.listen(config.testPort);
  console.log('App be listening on port ' + config.testPort);
} else {
  db = mongoose.connect(config.db);
  config.db = config.db;
  app.listen(config.port);
  console.log('App listening on port ' + config.port);
}

mongoose.connection.on('connected', function() {
  console.log('Mongoose default connection open to ' + config.db);
});

module.exports = app;
