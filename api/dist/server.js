'use strict';

var express = require('express');

var bodyParser = require('body-parser');

var routes = require('./routes/routes.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(8080, function () {
  console.log('App is listening on localhost:8080');
});

module.exports = app;
//# sourceMappingURL=server.js.map
