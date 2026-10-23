// Run with: npm run hash-password
// Asks for the admin password and prints the .env lines you need (password hash + a random JWT secret).
const crypto = require("crypto");
const readline = require("readline");
const bcrypt = require("bcryptjs");

// Reads one line without echoing what is typed.
function askHidden(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    let muted = false;

    rl._writeToOutput = (text) => {
      if (!muted) rl.output.write(text);
    };

    rl.question(question, (answer) => {
      rl.close();
      process.stdout.write("\n");
      resolve(answer);
    });

    muted = true;
  });
}

async function main() {
  const password = await askHidden("Choose an admin password (min 10 characters): ");

  if (password.length < 10) {
    console.error("Password is too short. Use at least 10 characters.");
    process.exit(1);
  }

  const confirm = await askHidden("Type it again to confirm: ");

  if (confirm !== password) {
    console.error("The two passwords do not match.");
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 12);
  const secret = crypto.randomBytes(48).toString("hex");

  console.log("\nAdd these lines to your .env file (keep the single quotes around the hash):\n");
  console.log(`ADMIN_PASSWORD_HASH='${hash}'`);
  console.log(`JWT_SECRET=${secret}`);
  console.log("\nAlso set ADMIN_EMAIL to the email you will log in with.");
  console.log("On Hostinger, paste the hash WITHOUT the single quotes into the environment variable field.\n");
}

main();
