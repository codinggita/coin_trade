const express = require("express");
const Stock = require("../models/Stock");
const router = express.Router();

// Get all stocks
router.get("/", async (req, res) => {
  const stocks = await Stock.find();
  res.json(stocks);
});

// Add a new stock
router.post("/add", async (req, res) => {
  const { name, symbol, price } = req.body;
  const stock = new Stock({ name, symbol, price });

  try {
    await stock.save();
    res.status(201).json({ message: "Stock added successfully", stock });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
