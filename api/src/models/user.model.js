var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
  username: String,
  password: String,
  balance: Number,
  // accounts: [{type: ObjectId, ref: 'User'}],
  salary: Number,
  frequency: String
});

// True since it is a parallel middleware
UserSchema.pre('save', function(next, done) {
  if (!this.username) {
    next(new Error('User should not be null'));
  }
  next();
});

var UserModel = Mongoose.model('User', UserSchema);

module.exports = UserModel;
