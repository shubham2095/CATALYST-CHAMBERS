const express = require("express");
const { careersLimiter } = require("../middleware/rateLimit");
const { resumeUpload } = require("../middleware/upload");
const validate = require("../middleware/validate");
const { careerSchema } = require("../schemas/careerSchema");
const { submitApplication } = require("../controllers/careerController");

const router = express.Router();

router.post("/", careersLimiter, resumeUpload.single("resume"), validate(careerSchema), submitApplication);

module.exports = router;
