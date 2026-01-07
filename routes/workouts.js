const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");

/* CREATE a workout */
router.post("/", async (req, res) => {
  try {
    const workout = new Workout(req.body);
    await workout.save();
    res.json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* READ all workouts */
router.get("/", async (req, res) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

/* READ one workout */
router.get("/:id", async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  res.json(workout);
});

/* UPDATE a workout */
router.put("/:id", async (req, res) => {
  const workout = await Workout.findById(req.params.id);

  if (!workout) {
    return res.status(404).json({ message: "Workout not found" });
  }

  Object.assign(workout, req.body);
  await workout.save();

  res.json(workout);
});

/* DELETE a workout */
router.delete("/:id", async (req, res) => {
  await Workout.findByIdAndDelete(req.params.id);
  res.json({ message: "Workout deleted" });
});

module.exports = router;
