const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const adminController = require("../controllers/admin.controller");
const authenticateAdmin = require("../middleware/authAdmin");

// Brute-force protection: max 10 login attempts per 15 minutes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many login attempts from this IP. Please try again in 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Public routes
router.post("/login", loginLimiter, adminController.loginAdmin);
router.post("/logout", adminController.logoutAdmin);
router.get("/session", adminController.getSession);

// Protected routes
router.get("/profile", authenticateAdmin, adminController.getProfile);
router.patch("/update-profile", authenticateAdmin, adminController.updateProfile);

module.exports = router;
