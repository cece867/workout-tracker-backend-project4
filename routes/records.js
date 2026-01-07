const express = require("express");
const router = express.Router();
const PersonalRecord = require("../models/PersonalRecord");

// CREATE record
router.post("/", async (req, res) => {
  try {
    const record = await PersonalRecord.create(req.body);
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ all records
router.get("/", async (req, res) => {
  const records = await PersonalRecord.find().sort({ createdAt: -1 });
  res.json(records);
});

// DELETE record
router.delete("/:id", async (req, res) => {
  const deleted = await PersonalRecord.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Record not found" });
  res.json({ message: "Record deleted" });
});

module.exports = router;
