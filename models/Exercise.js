const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema(
  {
    workoutId: { type: mongoose.Schema.Types.ObjectId, ref: "Workout", required: true },
    exerciseName: { type: String, required: true },

    sets: { type: Number, default: 1 },
    reps: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exercise", ExerciseSchema);

