var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var ObjectId = Schema.ObjectId;

var AccountSchema = new Schema({
  name: String,
  balance: Number,
  percentage: Number,
  subAccount: [{type: ObjectId, ref: 'Account'}]
});

// True since it is a parallel middleware
AccountSchema.pre('save', function(next, done) {
  if (!this.name) {
    next(new Error('Account name should not be null'));
  }
  next();
});

var AccountModel = Mongoose.model('Account', AccountSchema);

module.exports = AccountModel;
