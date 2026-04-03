const express = require("express");
const router = express.Router();
const testimonialController = require("../controllers/testimonial.controller");
const upload = require("../middleware/upload");
const authenticateAdmin = require("../middleware/authAdmin");

router.post(
  "/",
  upload.single("image"), authenticateAdmin,
  testimonialController.createTestimonial
);

router.patch(
  "/:id",
  upload.single("image"), authenticateAdmin,
  testimonialController.updateTestimonial
);

router.get("/", testimonialController.getTestimonials);  
router.get("/:id", testimonialController.getTestimonial);
router.delete("/:id", authenticateAdmin,testimonialController.deleteTestimonial);

module.exports = router;
