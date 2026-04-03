const express = require("express");
const router = express.Router();
const examController = require("../controllers/exam.controller");
const authenticateAdmin = require("../middleware/authAdmin");


router.post("/", authenticateAdmin,examController.createExam);

router.get("/", examController.getExams);

router.get("/:id", examController.getExam);

router.patch("/:id", authenticateAdmin,examController.updateExam);

router.delete("/:id", authenticateAdmin,examController.deleteExam);

module.exports = router;


