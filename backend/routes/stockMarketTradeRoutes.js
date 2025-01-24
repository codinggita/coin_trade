const express = require('express');
const StockMarketTrade = require('../models/StockMarketTrade');

const router = express.Router();

// Create
router.post('/', async (req, res) => {
  try {
    const trade = await StockMarketTrade.create(req.body);
    res.status(201).json(trade);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read All
router.get('/', async (req, res) => {
  try {
    const trades = await StockMarketTrade.find();
    res.json(trades);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const trade = await StockMarketTrade.findByIdAndUpdate(req.params.id, req.body, {
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
    await StockMarketTrade.findByIdAndDelete(req.params.id);
    res.json({ message: 'Trade deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
