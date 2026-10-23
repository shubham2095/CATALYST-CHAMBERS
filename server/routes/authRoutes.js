const express = require("express");
const { loginLimiter } = require("../middleware/rateLimit");
const { requireAdmin } = require("../middleware/auth");
const validate = require("../middleware/validate");
const { loginSchema } = require("../schemas/authSchema");
const { login, logout, me } = require("../controllers/authController");

const router = express.Router();

router.post("/login", loginLimiter, validate(loginSchema), login);
router.post("/logout", logout);
router.get("/me", requireAdmin, me);

module.exports = router;
