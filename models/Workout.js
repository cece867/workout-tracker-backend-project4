const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    enum: ['strength', 'yoga', 'pilates', 'tai-chi', 'stretching', 'cardio', 'mixed'],
    default: 'mixed'
  },
  duration: {
    type: Number,
    default: 0
  },
  notes: String,
  completed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);