process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/server');
var should = chai.should();

var mongoose = require('mongoose');
var User = require('../src/models/user.model.js');

chai.use(chaiHttp);

describe('Basics', function() {
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

  describe('/GET user', () => {
    it('it should GEt all the users', (done) => {
      chai.request(server)
        .get('/api/user')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          done();
        });
    });
  });

  describe('/DELETE user', () => {
    it('it should DELETE a user given the id', (done) => {
      let user = new User({
        username: 'test',
        password: 'test',
        balance: 100,
        salary: 100,
        frequency: 'Some Test'
      });

      user.save((err, user) => {
        chai.request(server)
          .delete('/user/' + book.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').
              eql('Book successfully deleted!');
            res.body.result.should.have.property('ok').eql(1);
            res.body.result.should.have.property('n').eql(1);
            done();
          });
      });
    });
  });  

});
