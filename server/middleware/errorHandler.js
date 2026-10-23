const multer = require("multer");

function notFound(req, res) {
  res.status(404).json({ error: "Not found." });
}

// Central error handler: client errors (4xx) are returned as JSON, everything else is logged and hidden.
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    const message =
      err.code === "LIMIT_FILE_SIZE" ? "File is too large. Maximum size is 10MB." : err.message;
    return res.status(400).json({ error: message });
  }

  const status = err.status || err.statusCode || 500;

  if (status < 500) {
    return res.status(status).json({ error: err.message });
  }

  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Something went wrong. Please try again later." });
}

module.exports = { notFound, errorHandler };
