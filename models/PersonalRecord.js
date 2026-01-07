const mongoose = require('mongoose');

const personalRecordSchema = new mongoose.Schema({
  exerciseName: {
    type: String,
    required: true
  },
  bestValue: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    enum: ['reps', 'seconds', 'minutes', 'lbs', 'kg'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  workoutId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout'
  },
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('PersonalRecord', personalRecordSchema);