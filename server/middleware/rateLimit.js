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

module.exports = { contactLimiter, careersLimiter };
