const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');

// GET all exercises
router.get('/', async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET exercises by workout ID
router.get('/workout/:workoutId', async (req, res) => {
  try {
    const exercises = await Exercise.find({ workoutId: req.params.workoutId });
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single exercise by ID
router.get('/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    res.json(exercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new exercise
router.post('/', async (req, res) => {
  const exercise = new Exercise({
    workoutId: req.body.workoutId,
    exerciseName: req.body.exerciseName,
    muscleGroups: req.body.muscleGroups,
    purpose: req.body.purpose,
    sets: req.body.sets,
    reps: req.body.reps,
    duration: req.body.duration,
    notes: req.body.notes
  });

  try {
    const newExercise = await exercise.save();
    res.status(201).json(newExercise);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH update exercise
router.patch('/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    if (req.body.exerciseName != null) {
      exercise.exerciseName = req.body.exerciseName;
    }
    if (req.body.muscleGroups != null) {
      exercise.muscleGroups = req.body.muscleGroups;
    }
    if (req.body.purpose != null) {
      exercise.purpose = req.body.purpose;
    }
    if (req.body.sets != null) {
      exercise.sets = req.body.sets;
    }
    if (req.body.reps != null) {
      exercise.reps = req.body.reps;
    }
    if (req.body.duration != null) {
      exercise.duration = req.body.duration;
    }
    if (req.body.notes != null) {
      exercise.notes = req.body.notes;
    }

    const updatedExercise = await exercise.save();
    res.json(updatedExercise);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE exercise
router.delete('/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    await exercise.deleteOne();
    res.json({ message: 'Exercise deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;