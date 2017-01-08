var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes/routes.js');
var app = express();

var mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes);

var db;
db = mongoose.connect("mongodb://localhost/bankinapi_test");

app.listen(8081, function() {
  console.log('App is listening on localhost:8081');
});

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + "mongodb://localhost/todoapi_test");
});

module.exports = app;
