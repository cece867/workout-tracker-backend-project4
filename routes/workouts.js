const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

// GET all workouts
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET workouts by type
router.get('/type/:workoutType', async (req, res) => {
  try {
    const workouts = await Workout.find({ type: req.params.workoutType });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single workout by ID
router.get('/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new workout
router.post('/', async (req, res) => {
  const workout = new Workout({
    name: req.body.name,
    date: req.body.date,
    type: req.body.type,
    duration: req.body.duration,
    notes: req.body.notes,
    completed: req.body.completed
  });

  try {
    const newWorkout = await workout.save();
    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH update workout
router.patch('/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    if (req.body.name != null) {
      workout.name = req.body.name;
    }
    if (req.body.date != null) {
      workout.date = req.body.date;
    }
    if (req.body.type != null) {
      workout.type = req.body.type;
    }
    if (req.body.duration != null) {
      workout.duration = req.body.duration;
    }
    if (req.body.notes != null) {
      workout.notes = req.body.notes;
    }
    if (req.body.completed != null) {
      workout.completed = req.body.completed;
    }

    const updatedWorkout = await workout.save();
    res.json(updatedWorkout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE workout
router.delete('/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    await workout.deleteOne();
    res.json({ message: 'Workout deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;