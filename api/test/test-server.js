process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/server');
var should = chai.should();

var mongoose = require('mongoose');
var User = require('../src/models/user.model.js');

describe('Basics', () => {
  chai.use(chaiHttp);
  it('Should return Hello World on /api GET', function(done) {
    chai.request(server)
      .get('/api')
      .end(function(err, res) {
        res.should.have.status(200);
        res.text.should.be.a('string');
        res.text.should.include('Hello From API');
        done();
      });
  });
});
