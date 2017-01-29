process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/server');
var should = chai.should();

var mongoose = require('mongoose');
var Account = require('../src/models/account.model.js');

chai.use(chaiHttp);

describe('Account', () => {
  beforeEach((done) => {
    Account.remove({}, (err) => {
      done();
    });
  });

  describe('Basic CRUD commands', () => {
    describe('/GET account', () => {
      it('it should GET all the users accounts', (done) => {
        chai.request(server)
          .get('/api/user')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
          });
      });
    });

    describe('/GET user:username', () => {
      it('it should GET a user given the username', (done) => {
        let user = new Account({
          username: 'test',
          password: 'test',
          balance: 100,
          salary: 100,
          frequency: 'Some Test'
        });

        user.save((err, user) => {
          chai.request(server)
            .get('/api/user/' + user.id)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('username').
                eql('test');
              done();
            });
        });
      });
    });

    describe('/DELETE user', () => {
      it('it should DELETE a user given the id', (done) => {
        let user = new Account({
          username: 'test',
          password: 'test',
          balance: 100,
          salary: 100,
          frequency: 'Some Test'
        });

        user.save((err, user) => {
          chai.request(server)
            .delete('/api/user/' + user.id)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message').
                eql('Account deleted successfully!');
              done();
            });
        });
      });
    });

  });
});
