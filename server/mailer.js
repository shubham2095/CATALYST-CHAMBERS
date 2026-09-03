const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendContactEmail({ name, email, phone, matterType, location, message }) {
  await transporter.sendMail({
    from: `"Catalyst Chambers Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    replyTo: email,
    subject: `New Consultation Request from ${name}${matterType ? ` — ${matterType}` : ""}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "-"}\nMatter Type: ${matterType || "-"}\nLocation: ${location || "-"}\n\nMessage:\n${message}`,
    html: `
      <h2>New Consultation Request — Catalyst Chambers Website</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "-"}</p>
      <p><strong>Matter Type:</strong> ${matterType || "-"}</p>
      <p><strong>Location:</strong> ${location || "-"}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
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
    subject: `New Career Application — ${name}${position ? ` (${position})` : ""}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "-"}\nPosition: ${position || "-"}\n\nCover Letter / Message:\n${message || "-"}`,
    html: `
      <h2>New Career Application — Catalyst Chambers</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "-"}</p>
      <p><strong>Position Applied For:</strong> ${position || "-"}</p>
      <p><strong>Cover Letter / Message:</strong></p>
      <p>${(message || "-").replace(/\n/g, "<br>")}</p>
    `,
    attachments,
  });
}

module.exports = { sendContactEmail, sendCareerApplication };
