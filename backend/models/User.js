const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  walletBalance: { type: Number, default: 10000 }, // Start with 10,000 virtual coins
  portfolio: [
    {
      stock: { type: mongoose.Schema.Types.ObjectId, ref: "Stock" },
      quantity: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
