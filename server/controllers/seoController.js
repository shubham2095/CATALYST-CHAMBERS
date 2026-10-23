const contentService = require("../services/contentService");

// Public pages and their search-engine priority.
const STATIC_PAGES = [
  { path: "/", priority: "1.0" },
  { path: "/about", priority: "0.8" },
  { path: "/services", priority: "0.8" },
  { path: "/contact", priority: "0.7" },
  { path: "/team", priority: "0.6" },
  { path: "/blog", priority: "0.6" },
  { path: "/faq", priority: "0.6" },
  { path: "/gallery", priority: "0.5" },
  { path: "/careers", priority: "0.5" },
  { path: "/privacy-policy", priority: "0.2" },
  { path: "/terms-of-service", priority: "0.2" },
];

const escapeXml = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

function siteUrl() {
  return (process.env.SITE_URL || "https://catalystchambers.com").replace(/\/+$/, "");
}

// Built from the live content, so new blog posts appear (and drafts never do) without any manual editing.
function getSitemap(req, res) {
  const base = siteUrl();
  const posts = contentService.getPublic().blog.posts;

  const entries = [
    ...STATIC_PAGES.map((page) => ({ loc: `${base}${page.path === "/" ? "/" : page.path}`, priority: page.priority })),
    ...posts.map((post) => ({ loc: `${base}/blog/${post.slug}`, lastmod: post.date, priority: "0.6" })),
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(
      (entry) =>
        `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>\n${entry.lastmod ? `    <lastmod>${entry.lastmod}</lastmod>\n` : ""}    <priority>${entry.priority}</priority>\n  </url>`
    ),
    "</urlset>",
    "",
  ].join("\n");

  res.type("application/xml").send(xml);
}

module.exports = { getSitemap };
