const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
require("dotenv").config();
const { sendContactEmail, sendCareerApplication } = require("./mailer");

const app = express();
const PORT = process.env.PORT || 5000;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only PDF and Word documents are allowed."));
  },
});

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, matterType, location, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  console.log("New consultation request received:", { name, email, phone, matterType, location, message });

  try {
    await sendContactEmail({ name, email, phone, matterType, location, message });
    res.json({ success: true });
  } catch (err) {
    console.error("Failed to send enquiry email:", err.message);
    res.status(500).json({ error: "Failed to send enquiry. Please try again later." });
  }
});

app.post("/api/careers", upload.single("resume"), async (req, res) => {
  const { name, email, phone, position, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  console.log("New career application received:", { name, email, phone, position });

  try {
    await sendCareerApplication({
      name,
      email,
      phone,
      position,
      message,
      resume: req.file,
    });
    res.json({ success: true });
  } catch (err) {
    console.error("Failed to send career application email:", err.message);
    res.status(500).json({ error: "Failed to submit application. Please try again later." });
  }
});

// Handle multer errors (file too large, wrong file type) with a JSON response
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message?.includes("Only PDF")) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
});

// Serve the built React app (client/dist copied into server/dist at deploy time)
const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath));

// SPA fallback: send index.html for any non-API route so React Router can handle it
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(distPath, "index.html"), (err) => {
    if (err) next();
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
