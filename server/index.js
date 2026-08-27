const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const { sendContactEmail } = require("./mailer");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  console.log("New enquiry received:", { name, email, phone, message });

  try {
    await sendContactEmail({ name, email, phone, message });
    res.json({ success: true });
  } catch (err) {
    console.error("Failed to send enquiry email:", err.message);
    res.status(500).json({ error: "Failed to send enquiry. Please try again later." });
  }
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
