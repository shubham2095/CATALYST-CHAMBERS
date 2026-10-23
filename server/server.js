const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const authService = require("./services/authService");
const routes = require("./routes");
const { getSitemap } = require("./controllers/seoController");
const contentService = require("./services/contentService");
const uploadService = require("./services/uploadService");
const { notFound, errorHandler } = require("./middleware/errorHandler");

contentService.init();
uploadService.init();

const app = express();
const PORT = process.env.PORT || 5000;
const distPath = path.join(__dirname, "..", "client", "dist");

// Hosting runs behind a reverse proxy; needed so rate limiting sees the real client IP.
app.set("trust proxy", 1);

app.use(
  helmet({
    // CSP is off for now: the site uses Google Fonts/Maps and inline styles from framer-motion.
    contentSecurityPolicy: false,
    // Allow the logo to be used as a social preview image on other sites.
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
// Admin saves (blog posts) can be larger than public form submissions.
app.use("/api/admin", express.json({ limit: "2mb" }));
app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());

// API
app.use("/api", routes);
app.use("/api", notFound);

// Images uploaded from the admin (random file names, so they can be cached for a long time)
app.use("/uploads", express.static(uploadService.uploadDir(), { maxAge: "30d", immutable: true }));

// Sitemap built from the live content (must come before the static files)
app.get("/sitemap.xml", getSitemap);

// The logo moved into /images/brand; keep the old address working for links and search results that still use it.
app.get("/logo.jpeg", (req, res) => res.redirect(301, "/images/brand/logo.jpeg"));

// Built React app
app.use(express.static(distPath));

// SPA fallback: any other route gets index.html so React Router can handle it (Express 5 needs a regex, not '*')
app.get(/^\/(?!(?:api|uploads)(?:\/|$)).*/, (req, res, next) => {
  // The admin panel must never show up in search results.
  if (req.path === "/admin" || req.path.startsWith("/admin/")) {
    res.set("X-Robots-Tag", "noindex, nofollow");
  }

  res.sendFile(path.join(distPath, "index.html"), (err) => {
    if (err) next();
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
    console.warn("Warning: EMAIL_USER, EMAIL_PASS or EMAIL_TO is not set. Contact and careers emails will fail.");
  }

  if (!authService.isConfigured()) {
    console.warn("Warning: ADMIN_EMAIL, ADMIN_PASSWORD_HASH or JWT_SECRET is not set. Admin login is disabled (run `npm run hash-password`).");
  } else if (process.env.JWT_SECRET.length < 32) {
    console.warn("Warning: JWT_SECRET is shorter than 32 characters. Use a longer random value.");
  }
});
