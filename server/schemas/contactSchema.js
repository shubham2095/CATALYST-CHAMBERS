const { z } = require("zod");

const optionalText = (max) => z.string().trim().max(max).default("");

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(254),
  phone: optionalText(30),
  matterType: optionalText(100),
  location: optionalText(150),
  message: z.string().trim().min(1, "Message is required.").max(5000),
});

module.exports = { contactSchema };
