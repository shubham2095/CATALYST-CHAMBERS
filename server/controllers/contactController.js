const { sendContactEmail } = require("../services/mailService");

async function submitContact(req, res) {
  try {
    await sendContactEmail(req.body);
    res.json({ success: true });
  } catch (err) {
    console.error("Failed to send enquiry email:", err.message);
    res.status(500).json({ error: "Failed to send enquiry. Please try again later." });
  }
}

module.exports = { submitContact };
