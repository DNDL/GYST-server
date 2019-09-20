const mongoose =  require('mongoose');

const habitSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    required: true
  },
  goal: {
    type: Number,
    required: true
  },
  color: {
    type: String,
  },
  why: {
    type: String,
    required: true
  }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Habit', habitSchema);
