const express = require("express");
const contactRoutes = require("./contactRoutes");
const careerRoutes = require("./careerRoutes");
const contentRoutes = require("./contentRoutes");
const authRoutes = require("./authRoutes");
const adminRoutes = require("./adminRoutes");

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/content", contentRoutes);
router.use("/contact", contactRoutes);
router.use("/careers", careerRoutes);

module.exports = router;
