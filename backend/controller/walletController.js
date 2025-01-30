const User = require("../models/User");
const Transaction = require("../models/Transaction");

const getWalletBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


const depositCoins = async (req, res) => {
  const { amount } = req.body;

  if (amount <= 0) return res.status(400).json({ message: "Invalid amount" });

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.balance += amount;
    await user.save();

    const transaction = new Transaction({ userId: user._id, type: "deposit", amount });
    await transaction.save();

    res.json({ message: "Deposit successful", newBalance: user.balance });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


const withdrawCoins = async (req, res) => {
  const { amount } = req.body;

  if (amount <= 0) return res.status(400).json({ message: "Invalid amount" });

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.balance < amount) return res.status(400).json({ message: "Insufficient balance" });

    user.balance -= amount;
    await user.save();

    const transaction = new Transaction({ userId: user._id, type: "withdraw", amount });
    await transaction.save();

    res.json({ message: "Withdrawal successful", newBalance: user.balance });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getWalletBalance, depositCoins, withdrawCoins };
