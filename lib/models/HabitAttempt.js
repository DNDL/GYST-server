const mongoose = require('mongoose');

const habitAttemptSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  habit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit',
    required: true
  },
  comment: {
    type: String
  }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('HabitAttempt', habitAttemptSchema);
