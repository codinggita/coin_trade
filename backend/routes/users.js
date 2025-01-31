const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Create a new user
router.post("/create", async (req, res) => {
  const { name } = req.body;
  const user = new User({ name });

  try {
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get user details
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).populate("portfolio.stock");
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

module.exports = router;
