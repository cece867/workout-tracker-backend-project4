const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },      // ex: "Leg Day"
    date: { type: String, required: true },       // keep string for beginner simplicity
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", WorkoutSchema);
