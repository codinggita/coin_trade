const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const opinionTradeRoutes = require('./routes/opinionTradeRoutes');
const gameTradeRoutes = require('./routes/gameTradeRoutes');
const stockMarketTradeRoutes = require('./routes/stockMarketTradeRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/opinion-trade', opinionTradeRoutes);
app.use('/api/game-trade', gameTradeRoutes);
app.use('/api/stock-market-trade', stockMarketTradeRoutes);

app.get('/', (req, res) => {
  res.send('CoinTrade API is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
