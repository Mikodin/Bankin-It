// import User from '../src/models/user'

var chai = require('chai');
var chaiHttp = require('chai-http');
var User = require('../dist/models/user.js');
var should = chai.should();

chai.use(chaiHttp);

describe('Basics', function() {
  it('Should have an id and password', function(done) {
    console.log(User);
  });

});

