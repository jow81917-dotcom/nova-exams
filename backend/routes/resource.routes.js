const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resource.controller");
const upload = require("../middleware/upload");
const authenticateAdmin = require("../middleware/authAdmin");

// Public routes
router.get("/", resourceController.getResources);
router.get("/:id/download", resourceController.downloadResource);

router.get("/:id", resourceController.getResource);

router.post(
  "/",
  upload.fields([{ name: "pdfFile" }, { name: "videoFile" }]),authenticateAdmin,
  resourceController.createResource
);

router.patch(
  "/:id",
  upload.fields([{ name: "pdfFile" }, { name: "videoFile" }]),authenticateAdmin,
  resourceController.updateResource
);

router.delete("/:id", authenticateAdmin,resourceController.deleteResource);

module.exports = router;
