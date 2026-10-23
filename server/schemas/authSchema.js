const { z } = require("zod");

const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required.").max(254),
  password: z.string().min(1, "Password is required.").max(200),
});

module.exports = { loginSchema };
