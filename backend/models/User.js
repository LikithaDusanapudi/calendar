const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

// Directly compare the plain-text password
UserSchema.methods.comparePassword = function (password) {
  return this.password === password; // Compare stored password with entered password
};

module.exports = mongoose.model('User', UserSchema);
