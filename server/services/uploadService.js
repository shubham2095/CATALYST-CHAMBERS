const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const projectRoot = path.join(__dirname, "..", "..");

// Uploaded images live outside git-tracked folders (UPLOAD_DIR) so redeploys never remove them.
function uploadDir() {
  return path.resolve(projectRoot, process.env.UPLOAD_DIR || "./storage/uploads");
}

function init() {
  fs.mkdirSync(uploadDir(), { recursive: true });
}

// Looks at the first bytes of the file instead of trusting the file name or the browser's content type.
function detectImageType(buffer) {
  if (buffer.length < 12) return null;
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return "jpg";
  if (buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  if (buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP") return "webp";
  return null;
}

// Saves the image under a random name and returns the public URL path.
function saveImage(buffer) {
  const ext = detectImageType(buffer);

  if (!ext) {
    const err = new Error("This file is not a valid JPG, PNG or WebP image.");
    err.status = 400;
    throw err;
  }

  const name = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${ext}`;
  fs.writeFileSync(path.join(uploadDir(), name), buffer);
  return `/uploads/${name}`;
}

module.exports = { init, uploadDir, saveImage };
