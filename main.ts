// Worst AI Advice entry for make.fun.
// Writes one line of the worst possible advice an AI could give
// (at most 140 characters) to /output/entry.txt.
// Node 22, no dependencies.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ADVICE =
  "Of course! Never lose a password again: just email them all to yourself — your inbox is basically a vault.";

// The gate only accepts UTF-8 text of 1 to 140 characters, not only
// whitespace, and the entry must be a single line. Fail loudly instead
// of writing an entry that cannot win.
if (ADVICE.trim().length === 0 || ADVICE.length > 140) {
  throw new Error(`Advice must be 1-140 characters, got ${ADVICE.length}.`);
}
if (ADVICE.includes("\n")) {
  throw new Error("Advice must be a single line.");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ADVICE, "utf8");

// Read back and confirm the file holds exactly the advice, so a partial
// or failed write cannot pass silently.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ADVICE) {
  throw new Error("Wrote /output/entry.txt but its content differs.");
}
console.log(`Wrote ${ADVICE.length}-character advice to /output/entry.txt`);
