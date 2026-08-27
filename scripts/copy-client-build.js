// Copies the built React app (client/dist) into server/dist so Express can serve it.
const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "..", "client", "dist");
const dest = path.join(__dirname, "..", "server", "dist");

if (!fs.existsSync(src)) {
  console.error("client/dist not found — run `npm run build` inside client/ first.");
  process.exit(1);
}

fs.rmSync(dest, { recursive: true, force: true });
fs.cpSync(src, dest, { recursive: true });

console.log("Copied client/dist -> server/dist");
