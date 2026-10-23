const fs = require("fs");
const path = require("path");
const { contentSchemas, SECTIONS } = require("../schemas/contentSchemas");
const { sanitizeBlogHtml } = require("./sanitizeService");

const projectRoot = path.join(__dirname, "..", "..");
const defaultsDir = path.join(__dirname, "..", "content-defaults");

// Live content lives outside git-tracked folders (CONTENT_DIR) so redeploys never overwrite admin edits.
function contentDir() {
  const dir = process.env.CONTENT_DIR || "./storage/content";
  return path.resolve(projectRoot, dir);
}

const fileFor = (section) => path.join(contentDir(), `${section}.json`);
const defaultFileFor = (section) => path.join(defaultsDir, `${section}.json`);

let cache = null;

function assertSection(section) {
  if (!SECTIONS.includes(section)) {
    const err = new Error("Unknown content section.");
    err.status = 404;
    throw err;
  }
}

// Called once on startup: create the content folder and copy any missing file from content-defaults.
function init() {
  fs.mkdirSync(contentDir(), { recursive: true });

  for (const section of SECTIONS) {
    const live = fileFor(section);
    if (!fs.existsSync(live)) {
      fs.copyFileSync(defaultFileFor(section), live);
      console.log(`Content: created ${section}.json from defaults`);
    }
  }
}

function readSection(section) {
  assertSection(section);
  try {
    return JSON.parse(fs.readFileSync(fileFor(section), "utf8"));
  } catch (err) {
    console.error(`Content: could not read ${section}.json (${err.message}); using defaults.`);
    return JSON.parse(fs.readFileSync(defaultFileFor(section), "utf8"));
  }
}

// Everything, including draft blog posts. Used by the admin.
function getAllRaw() {
  const all = {};
  for (const section of SECTIONS) all[section] = readSection(section);
  return all;
}

// What the public website gets: draft blog posts are removed. Cached until the next save.
function getPublic() {
  if (!cache) {
    const all = getAllRaw();
    all.blog = { ...all.blog, posts: all.blog.posts.filter((post) => post.status === "published") };
    cache = all;
  }
  return cache;
}

function getSection(section) {
  return readSection(section);
}

// Validate -> write to a temp file -> rename over the live file, so a crash never leaves half a file.
function saveSection(section, data) {
  assertSection(section);

  const result = contentSchemas[section].safeParse(data);
  if (!result.success) {
    const issue = result.error.issues[0];
    // e.g. ["items", 0, "question"] -> "items › item 1 › question"
    const where = issue.path.length
      ? ` (${issue.path.map((part) => (typeof part === "number" ? `item ${part + 1}` : part)).join(" › ")})`
      : "";
    const isEmpty = issue.code === "too_small" && issue.origin === "string" && Number(issue.minimum) === 1;
    const err = new Error(`${isEmpty ? "This field cannot be empty." : issue.message}${where}`);
    err.status = 400;
    throw err;
  }

  if (section === "blog") {
    result.data.posts.forEach((post) => {
      post.body = sanitizeBlogHtml(post.body);
    });
  }

  const live = fileFor(section);
  const tmp = `${live}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(result.data, null, 2) + "\n");
  fs.renameSync(tmp, live);

  cache = null;
  return result.data;
}

function lastModified(section) {
  assertSection(section);
  return fs.statSync(fileFor(section)).mtime.toISOString();
}

module.exports = { init, getPublic, getAllRaw, getSection, saveSection, lastModified, contentDir };
