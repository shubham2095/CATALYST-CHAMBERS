const contentService = require("../services/contentService");
const { SECTIONS } = require("../schemas/contentSchemas");

// One row per section with its last edit time, for the dashboard.
function listSections(req, res) {
  res.json({
    sections: SECTIONS.map((name) => ({ name, lastModified: contentService.lastModified(name) })),
  });
}

// Full section as stored, including draft blog posts.
function getSection(req, res) {
  res.json({
    data: contentService.getSection(req.params.section),
    lastModified: contentService.lastModified(req.params.section),
  });
}

function saveSection(req, res) {
  const data = contentService.saveSection(req.params.section, req.body);
  res.json({ data, lastModified: contentService.lastModified(req.params.section) });
}

module.exports = { listSections, getSection, saveSection };
