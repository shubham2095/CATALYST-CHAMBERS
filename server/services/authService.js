const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const COOKIE_NAME = "admin_token";

// Compared against when the email is wrong, so a wrong email and a wrong password take the same time.
const DUMMY_HASH = bcrypt.hashSync("not-the-admin-password", 10);

function isConfigured() {
  return Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD_HASH && process.env.JWT_SECRET);
}

async function verifyCredentials(email, password) {
  const emailMatches = email.trim().toLowerCase() === process.env.ADMIN_EMAIL.trim().toLowerCase();

  try {
    const passwordMatches = await bcrypt.compare(password, emailMatches ? process.env.ADMIN_PASSWORD_HASH : DUMMY_HASH);
    return emailMatches && passwordMatches;
  } catch (err) {
    console.error("Admin login: ADMIN_PASSWORD_HASH is not a valid bcrypt hash.", err.message);
    return false;
  }
}

function signToken(email) {
  return jwt.sign({ sub: email }, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: process.env.JWT_EXPIRES_IN || "8h",
  });
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET, { algorithms: ["HS256"] });
}

// httpOnly keeps the token away from page scripts; sameSite=strict stops other sites from using it.
function cookieOptions(token) {
  const { exp } = jwt.decode(token);

  return {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.COOKIE_SECURE === "true",
    path: "/",
    maxAge: Math.max(exp * 1000 - Date.now(), 0),
  };
}

const clearCookieOptions = () => ({
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.COOKIE_SECURE === "true",
  path: "/",
});

module.exports = {
  COOKIE_NAME,
  isConfigured,
  verifyCredentials,
  signToken,
  verifyToken,
  cookieOptions,
  clearCookieOptions,
};
