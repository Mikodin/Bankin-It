var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  password: String,
  balance: Number,
  accounts: [{type: ObjectId, ref: 'User'}],
  salary: Number,
  frequency: string
});

// True since it is a parallel middleware
UserSchema.pre('save', function(next, done) {
  if (!this.todo) {
    next(new Error('User should not be null'));
  }
  next();
});

var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
