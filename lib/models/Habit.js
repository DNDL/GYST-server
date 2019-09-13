const mongoose =  require('mongoose');

const habitSchema = new mongoose.Schema({
  owner: {
    // Relationship to current signed in user
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  frequency: {
    // How often: Daily, Weekly, Monthly
    type: String,
    required: true
  },
  goal: {
    // How many times per selected frequency? 2 times a day?
    type: Number,
    required: true
  },
  why: {
    type: String,
    required: true
  }
}, { versionKey: false });

module.exports = mongoose.model('Habit', habitSchema);
