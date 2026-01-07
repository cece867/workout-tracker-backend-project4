const express = require('express');
const router = express.Router();
const PersonalRecord = require('../models/PersonalRecord');

// GET all personal records
router.get('/', async (req, res) => {
  try {
    const records = await PersonalRecord.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET personal records by exercise name
router.get('/exercise/:exerciseName', async (req, res) => {
  try {
    const records = await PersonalRecord.find({ exerciseName: req.params.exerciseName });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single personal record by ID
router.get('/:id', async (req, res) => {
  try {
    const record = await PersonalRecord.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Personal record not found' });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new personal record
router.post('/', async (req, res) => {
  const record = new PersonalRecord({
    exerciseName: req.body.exerciseName,
    bestValue: req.body.bestValue,
    unit: req.body.unit,
    date: req.body.date,
    workoutId: req.body.workoutId,
    notes: req.body.notes
  });

  try {
    const newRecord = await record.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH update personal record
router.patch('/:id', async (req, res) => {
  try {
    const record = await PersonalRecord.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Personal record not found' });
    }

    if (req.body.exerciseName != null) {
      record.exerciseName = req.body.exerciseName;
    }
    if (req.body.bestValue != null) {
      record.bestValue = req.body.bestValue;
    }
    if (req.body.unit != null) {
      record.unit = req.body.unit;
    }
    if (req.body.date != null) {
      record.date = req.body.date;
    }
    if (req.body.workoutId != null) {
      record.workoutId = req.body.workoutId;
    }
    if (req.body.notes != null) {
      record.notes = req.body.notes;
    }

    const updatedRecord = await record.save();
    res.json(updatedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE personal record
router.delete('/:id', async (req, res) => {
  try {
    const record = await PersonalRecord.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Personal record not found' });
    }
    await record.deleteOne();
    res.json({ message: 'Personal record deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;