const express = require("express");
const router = express.Router();
const Exercise = require("../models/Exercise");

// CREATE exercise (must include workoutId)
router.post("/", async (req, res) => {
  try {
    const exercise = await Exercise.create(req.body);
    res.status(201).json(exercise);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ exercises for a workout
router.get("/workout/:workoutId", async (req, res) => {
  const exercises = await Exercise.find({ workoutId: req.params.workoutId });
  res.json(exercises);
});

// DELETE exercise
router.delete("/:id", async (req, res) => {
  const deleted = await Exercise.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Exercise not found" });
  res.json({ message: "Exercise deleted" });
});

module.exports = router;
