const express = require("express");
const rateLimit = require("express-rate-limit");
const contactController = require("../controllers/contact.controller");

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many messages sent. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/", contactLimiter, contactController.sendContactMessage);

module.exports = router;
