const express = require("express");
const router = express.Router();
const telegramController = require("../controllers/telegram.controller");
const authenticateAdmin = require("../middleware/authAdmin");

router.post("/test", authenticateAdmin, telegramController.testTelegram);

module.exports = router;
