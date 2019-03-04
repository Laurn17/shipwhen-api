'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('mongoose-type-email');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  firstName: {type: String, default: ''},
  lastName: {type: String, default: ''},
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {type: mongoose.SchemaTypes.Email, required: true, lowercase: true}
});

UserSchema.methods.serialize = function() {
  return {
    username: this.username || '',
    firstName: this.firstName || '',
    lastName: this.lastName || '',
    email: this.email || ''
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);

module.exports = {User};