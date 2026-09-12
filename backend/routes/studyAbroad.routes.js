const express = require("express");
const router = express.Router();
const studyAbroadController = require("../controllers/studyAbroad.controller");
const authenticateAdmin = require("../middleware/authAdmin");

router.get("/", studyAbroadController.getStudyAbroadOpportunities);
router.get("/:id", studyAbroadController.getStudyAbroadOpportunity);
router.post("/", authenticateAdmin, studyAbroadController.createStudyAbroadOpportunity);
router.patch("/:id", authenticateAdmin, studyAbroadController.updateStudyAbroadOpportunity);
router.delete("/:id", authenticateAdmin, studyAbroadController.deleteStudyAbroadOpportunity);

module.exports = router;
