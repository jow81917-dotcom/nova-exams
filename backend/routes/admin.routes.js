const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const authenticateAdmin = require("../middleware/authAdmin");

// Public route
router.post("/login", adminController.loginAdmin);
router.post("/logout", adminController.logoutAdmin);
router.get("/session", adminController.getSession);
// Protected routes
router.get("/profile", authenticateAdmin, adminController.getProfile);
router.patch("/update-profile", authenticateAdmin, adminController.updateProfile);

module.exports = router;
