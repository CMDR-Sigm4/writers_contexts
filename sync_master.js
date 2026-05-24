#!/usr/bin/env node
/**
 * sync_master.js
 * Import technical files from master into the current branch (for example, scrivania)
 * without merging — no risk for narrative content.
 *
 * Usage:
 *   node sync_master.js
 */


// TEST SYNC MASTER TO scrivania

const { execSync } = require("child_process");

const TECHNICAL_FILES = [
  "CLAUDE.md",
  "AGENTS.md",
  "USER_GUIDE.md",
  "VISUAL_USER_GUIDE.svg",
  ".gitignore",
  ".claudeignore",
  ".claude/",
  "00_meta/index.md",
  "00_meta/project_rules.md",
  "00_meta/rules/",
  "00_meta/architecture_schema.md",
  "sync_master.js"
];

function run(cmd) {
  return execSync(cmd, { encoding: "utf8" }).trim();
}

// Check current branch
const currentBranch = run("git rev-parse --abbrev-ref HEAD");
if (currentBranch === "master") {
  console.error("You are on master. Switch to scrivania first:\n  git checkout scrivania");
  process.exit(1);
}

console.log(`Active branch: ${currentBranch}`);
console.log("Importing technical files from master...\n");

const imported = [];
const skipped = [];

for (const file of TECHNICAL_FILES) {
  try {
    run(`git checkout master -- "${file}"`);
    imported.push(file);
    console.log(`  ✓ ${file}`);
  } catch {
    skipped.push(file);
    console.log(`  - ${file} (not found on master, skipped)`);
  }
}

if (imported.length === 0) {
  console.log("\nNo files imported.");
  process.exit(0);
}

// Automatic commit
run(`git commit -m "sync: update technical files from master"`);
console.log(`\nCommit created. Imported ${imported.length} item(s).`);
if (skipped.length > 0) {
  console.log(`Skipped (missing on master): ${skipped.join(", ")}`);
}
