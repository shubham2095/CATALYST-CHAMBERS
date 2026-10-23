const { COOKIE_NAME, verifyToken } = require("../services/authService");

// Blocks a route unless the request carries a valid admin login cookie.
function requireAdmin(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME];

  if (!token) {
    return res.status(401).json({ error: "Please log in." });
  }

  try {
    req.admin = verifyToken(token);
    next();
  } catch {
    res.status(401).json({ error: "Your session has expired. Please log in again." });
  }
}

module.exports = { requireAdmin };
