const mongoose = require('mongoose');

const habitAttemptSchema = new mongoose.Schema({
  habit: {
    // Relationship to habit
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit',
    required: true
  },
  progress: {
    // Progress towards habit goal
    type: Number,
    required: true
  }
}, { timestamps: true }, { versionKey: false });

module.exports = mongoose.model('HabitAttempt', habitAttemptSchema);
