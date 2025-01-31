const express = require("express");
const User = require("../models/User");
const Stock = require("../models/Stock");
const Transaction = require("../models/Transaction");
const router = express.Router();

// Buy Stocks
router.post("/buy", async (req, res) => {
  const { userId, stockId, quantity } = req.body;
  const user = await User.findById(userId);
  const stock = await Stock.findById(stockId);
  if (!user || !stock) return res.status(404).json({ error: "User or Stock not found" });

  const totalCost = stock.price * quantity;
  if (user.walletBalance < totalCost) {
    return res.status(400).json({ error: "Insufficient balance" });
  }

  // Deduct balance and update portfolio
  user.walletBalance -= totalCost;
  const existingStock = user.portfolio.find(item => item.stock.toString() === stockId);
  if (existingStock) {
    existingStock.quantity += quantity;
  } else {
    user.portfolio.push({ stock: stockId, quantity });
  }
  await user.save();

  // Save transaction
  const transaction = new Transaction({ user: userId, stock: stockId, type: "BUY", quantity, priceAtTransaction: stock.price });
  await transaction.save();

  res.json({ message: "Stock purchased successfully", user });
});

// Sell Stocks
router.post("/sell", async (req, res) => {
  const { userId, stockId, quantity } = req.body;
  const user = await User.findById(userId);
  const stock = await Stock.findById(stockId);
  if (!user || !stock) return res.status(404).json({ error: "User or Stock not found" });

  const userStock = user.portfolio.find(item => item.stock.toString() === stockId);
  if (!userStock || userStock.quantity < quantity) {
    return res.status(400).json({ error: "Not enough stock to sell" });
  }

  // Increase balance and update portfolio
  user.walletBalance += stock.price * quantity;
  userStock.quantity -= quantity;
  if (userStock.quantity === 0) {
    user.portfolio = user.portfolio.filter(item => item.stock.toString() !== stockId);
  }
  await user.save();

  // Save transaction
  const transaction = new Transaction({ user: userId, stock: stockId, type: "SELL", quantity, priceAtTransaction: stock.price });
  await transaction.save();

  res.json({ message: "Stock sold successfully", user });
});

module.exports = router;
