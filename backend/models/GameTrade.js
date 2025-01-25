const mongoose = require('mongoose');

const gameTradeSchema = new mongoose.Schema({
  gameName: { type: String, required: true },
  player: { type: String, required: true },
  coins: { type: Number, required: true },
});

module.exports = mongoose.model('GameTrade', gameTradeSchema);
