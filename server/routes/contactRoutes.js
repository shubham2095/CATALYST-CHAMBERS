const express = require("express");
const { contactLimiter } = require("../middleware/rateLimit");
const validate = require("../middleware/validate");
const { contactSchema } = require("../schemas/contactSchema");
const { submitContact } = require("../controllers/contactController");

const router = express.Router();

router.post("/", contactLimiter, validate(contactSchema), submitContact);

module.exports = router;
