const rateLimit = require("express-rate-limit");

function limiter({ windowMinutes, max, message }) {
  return rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    limit: max,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { error: message },
  });
}

const contactLimiter = limiter({
  windowMinutes: 15,
  max: 10,
  message: "Too many enquiries from this connection. Please try again later.",
});

const careersLimiter = limiter({
  windowMinutes: 15,
  max: 10,
  message: "Too many applications from this connection. Please try again later.",
});

// Only failed attempts count, so a successful login never locks the owner out.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many login attempts. Please try again in a few minutes." },
});

module.exports = { contactLimiter, careersLimiter, loginLimiter };
