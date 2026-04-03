const express = require("express");
const router = express.Router();
const teamController = require("../controllers/team.controller");
const upload = require("../middleware/upload");
const authenticateAdmin = require("../middleware/authAdmin");

router.post(
  "/",
  upload.single("image"), authenticateAdmin,
  teamController.createTeamMember
);

router.patch(
  "/:id",
  upload.single("image"), authenticateAdmin,
  teamController.updateTeamMember
);

router.get("/", teamController.getTeamMembers);
router.get("/:id", teamController.getTeamMember);
router.delete("/:id", authenticateAdmin, teamController.deleteTeamMember);

module.exports = router;
