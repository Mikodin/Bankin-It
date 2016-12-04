var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/app');
var should = chai.should();

chai.use(chaiHttp);

describe('Basics', function() {
  it('Should return Hello World on / GET', function(done) {
    chai.request('http://localhost:8080')
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        res.text.should.be.a('string');
        done();
      });
  });
});

