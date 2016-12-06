var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/server');
var should = chai.should();

chai.use(chaiHttp);

describe('Basics', function() {
  it('Should return Hello World on / GET', function(done) {
    chai.request(server)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        res.text.should.be.a('string');
        res.text.should.include('Hello World');
        done();
      });
  });

  it('Should return user on login ', function(done) {
    var User = {
      Username: 'Michael',
      Password: 'Test'
    };

    chai.request(server)
      .post('/user').send(User)
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.should.include(User);
        done();
      });
  });
});

