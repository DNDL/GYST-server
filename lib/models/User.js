const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  friendInvitations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { versionKey: false });

module.exports = mongoose.model('User', userSchema);
