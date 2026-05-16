const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogpost.controller");
const authenticateAdmin = require("../middleware/authAdmin");
const upload = require("../middleware/upload");

router.post("/", authenticateAdmin, upload.single("image"), blogController.createBlogPost);
router.get("/", blogController.getBlogPosts);
router.get("/:id", blogController.getBlogPost);
router.patch("/:id", authenticateAdmin, upload.single("image"), blogController.updateBlogPost);
router.delete("/:id", authenticateAdmin, blogController.deleteBlogPost);

module.exports = router;
