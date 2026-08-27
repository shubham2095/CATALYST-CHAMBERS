const express = require("express");
const cors = require("cors");
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
