const { z } = require("zod");

const optionalText = (max) => z.string().trim().max(max).default("");

const careerSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(254),
  phone: optionalText(30),
  position: optionalText(100),
  message: optionalText(5000),
});

module.exports = { careerSchema };
