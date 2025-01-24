const express = require('express');
const OpinionTrade = require('../models/OpinionTrade');

const router = express.Router();

// Create
router.post('/', async (req, res) => {
  try {
    const trade = await OpinionTrade.create(req.body);
    res.status(201).json(trade);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read All
router.get('/', async (req, res) => {
  try {
    const trades = await OpinionTrade.find();
    res.json(trades);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const trade = await OpinionTrade.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(trade);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    await OpinionTrade.findByIdAndDelete(req.params.id);
    res.json({ message: 'Trade deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
