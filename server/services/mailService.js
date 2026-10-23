const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Submitted text goes into an HTML email, so it must be escaped first.
function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function multiline(value = "") {
  return escapeHtml(value).replace(/\r?\n/g, "<br>");
}

// Keep user input out of subject lines as a single clean line.
function singleLine(value = "") {
  return String(value).replace(/[\r\n]+/g, " ").trim();
}

async function sendContactEmail({ name, email, phone, matterType, location, message }) {
  await transporter.sendMail({
    from: `"Catalyst Chambers Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    replyTo: email,
    subject: `New Consultation Request from ${singleLine(name)}${matterType ? ` — ${singleLine(matterType)}` : ""}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "-"}\nMatter Type: ${matterType || "-"}\nLocation: ${location || "-"}\n\nMessage:\n${message}`,
    html: `
      <h2>New Consultation Request — Catalyst Chambers Website</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || "-")}</p>
      <p><strong>Matter Type:</strong> ${escapeHtml(matterType || "-")}</p>
      <p><strong>Location:</strong> ${escapeHtml(location || "-")}</p>
      <p><strong>Message:</strong></p>
      <p>${multiline(message)}</p>
    `,
  });
}

async function sendCareerApplication({ name, email, phone, position, message, resume }) {
  const attachments = resume
    ? [
        {
          filename: resume.originalname,
          content: resume.buffer,
        },
      ]
    : [];

  await transporter.sendMail({
    from: `"Catalyst Chambers Careers" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    replyTo: email,
    subject: `New Career Application — ${singleLine(name)}${position ? ` (${singleLine(position)})` : ""}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "-"}\nPosition: ${position || "-"}\n\nCover Letter / Message:\n${message || "-"}`,
    html: `
      <h2>New Career Application — Catalyst Chambers</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || "-")}</p>
      <p><strong>Position Applied For:</strong> ${escapeHtml(position || "-")}</p>
      <p><strong>Cover Letter / Message:</strong></p>
      <p>${multiline(message || "-")}</p>
    `,
    attachments,
  });
}

module.exports = { sendContactEmail, sendCareerApplication };
