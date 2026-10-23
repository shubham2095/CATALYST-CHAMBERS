const authService = require("../services/authService");

async function login(req, res) {
  if (!authService.isConfigured()) {
    return res.status(503).json({ error: "Admin login is not set up on the server yet." });
  }

  const { email, password } = req.body;
  const ok = await authService.verifyCredentials(email, password);

  if (!ok) {
    return res.status(401).json({ error: "Incorrect email or password." });
  }

  const token = authService.signToken(process.env.ADMIN_EMAIL);
  res.cookie(authService.COOKIE_NAME, token, authService.cookieOptions(token));
  res.json({ email: process.env.ADMIN_EMAIL });
}

function logout(req, res) {
  res.clearCookie(authService.COOKIE_NAME, authService.clearCookieOptions());
  res.json({ success: true });
}

function me(req, res) {
  res.json({ email: req.admin.sub });
}

module.exports = { login, logout, me };
