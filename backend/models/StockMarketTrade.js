const mongoose = require('mongoose');

const stockMarketTradeSchema = new mongoose.Schema({
  stockName: { type: String, required: true },
  user: { type: String, required: true },
  coins: { type: Number, required: true },
});

module.exports = mongoose.model('StockMarketTrade', stockMarketTradeSchema);