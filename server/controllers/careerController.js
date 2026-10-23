const { sendCareerApplication } = require("../services/mailService");

async function submitApplication(req, res) {
  try {
    await sendCareerApplication({ ...req.body, resume: req.file });
    res.json({ success: true });
  } catch (err) {
    console.error("Failed to send career application email:", err.message);
    res.status(500).json({ error: "Failed to submit application. Please try again later." });
  }
}

module.exports = { submitApplication };
