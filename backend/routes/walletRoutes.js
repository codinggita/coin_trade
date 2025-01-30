const express = require("express");
const { getWalletBalance, depositCoins, withdrawCoins } = require("../controllers/walletController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/balance", protect, getWalletBalance);
router.post("/deposit", protect, depositCoins);
router.post("/withdraw", protect, withdrawCoins);

module.exports = router;
