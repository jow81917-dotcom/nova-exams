const express = require("express");
const router = express.Router();
const bookingSubmissionController = require("../controllers/bookingSubmission.controller");
const authenticateAdmin = require("../middleware/authAdmin");
const upload = require("../middleware/upload");

router.post(
  "/",
  upload.single("receipt"),
  bookingSubmissionController.createBookingSubmission
);

router.get("/", authenticateAdmin, bookingSubmissionController.getBookingSubmissions);
router.patch("/:id", authenticateAdmin, bookingSubmissionController.updateBookingSubmission);
router.delete("/:id", authenticateAdmin, bookingSubmissionController.deleteBookingSubmission);

module.exports = router;
