const contentService = require("../services/contentService");

function getPublicContent(req, res) {
  // Edits must show up on the next page load.
  res.set("Cache-Control", "no-cache");
  res.json(contentService.getPublic());
}

module.exports = { getPublicContent };
