const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["deposit", "withdraw", "trade"], required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["success", "pending", "failed"], default: "success" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
