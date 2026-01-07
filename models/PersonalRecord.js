const mongoose = require("mongoose");

const PersonalRecordSchema = new mongoose.Schema(
  {
    exerciseName: { type: String, required: true }, // ex: "Bench Press"
    value: { type: Number, required: true },        // ex: 185
    unit: { type: String, default: "lbs" },         // "lbs" or "kg"
    date: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("PersonalRecord", PersonalRecordSchema);
