const mongoose = require('mongoose');

const opinionTradeSchema = new mongoose.Schema({
  user: { type: String, required: true },
  opinion: { type: String, required: true },
  coins: { type: Number, required: true },
});

module.exports = mongoose.model('OpinionTrade', opinionTradeSchema);