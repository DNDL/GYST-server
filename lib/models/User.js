const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  friends: {
    type: Array
  },
  friendInvitations: {
    type: Array
  }
}, { versionKey: false });

module.exports = mongoose.model('User', userSchema);
