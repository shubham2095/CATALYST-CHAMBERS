const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const helmet = require("helmet");
const routes = require("./routes");
const contentService = require("./services/contentService");
const { notFound, errorHandler } = require("./middleware/errorHandler");

contentService.init();

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
app.use(express.json({ limit: "100kb" }));

// API
app.use("/api", routes);
app.use("/api", notFound);

// Built React app
app.use(express.static(distPath));

// SPA fallback: any other route gets index.html so React Router can handle it (Express 5 needs a regex, not '*')
app.get(/^\/(?!api(?:\/|$)).*/, (req, res, next) => {
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
});
