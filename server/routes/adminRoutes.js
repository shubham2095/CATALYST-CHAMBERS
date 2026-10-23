const express = require("express");
const { requireAdmin } = require("../middleware/auth");
const { imageUpload } = require("../middleware/upload");
const { listSections, getSection, saveSection } = require("../controllers/adminContentController");
const { uploadImage } = require("../controllers/uploadController");

const router = express.Router();

// Everything under /api/admin needs a logged-in admin.
router.use(requireAdmin);

router.get("/content", listSections);
router.get("/content/:section", getSection);
router.put("/content/:section", saveSection);

router.post("/upload", imageUpload.single("image"), uploadImage);

module.exports = router;
