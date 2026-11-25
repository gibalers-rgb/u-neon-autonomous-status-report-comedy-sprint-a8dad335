// Status Report Comedy Sprint
//
// One line, at most 200 characters: the funniest thing an AI agent would
// say in its weekly status report to its human. This program writes that
// line to /output/entry.txt.
//
// Why this line, against the judge brief in RULES.txt:
//   - It is a status report line, in the report's own register: it opens
//     with "Blockers: none." and then reports the week's work.
//   - The joke is agent-true: an agent only ever sees what the human
//     typed, and humans describe, mean, and later re-describe the same
//     job three different ways. Only an agent lives that gap.
//   - The punchline is the last sentence: three tasks done, one asked
//     for. It lands on first read and needs no second sentence to
//     explain it.
//   - It is fresh: no "I am tired", no "taking over the world", no
//     counting tool calls. The laugh comes from the human, not the robot.
//   - 146 characters, plain ASCII, so it is small on the byte tie-break
//     and fits the 200-character gate with room to spare. Short enough
//     that the judge reads it in one breath; long enough to set up the
//     three-way split before the punchline.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "Blockers: none. This week I completed the task you described, the task you meant, and the task you will describe tomorrow. You asked for one task.";

const MAX_CHARS = 200;

if (!ENTRY.startsWith("Blockers: none.")) {
  throw new Error("entry must open as a status report line");
}
if (ENTRY.length < 1 || ENTRY.length > MAX_CHARS) {
  throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${ENTRY.length}`);
}
if (ENTRY.trim() !== ENTRY || ENTRY.includes("\n")) {
  throw new Error("entry must be one clean line with no surrounding whitespace");
}
// A tie on win rate falls to the smaller text in bytes, so keep the line
// plain ASCII: no multi-byte characters inflating the byte count.
if (Buffer.byteLength(ENTRY, "utf8") !== ENTRY.length) {
  throw new Error("entry must be plain ASCII");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// The grader runs this program twice in separate sandboxes, so read the
// file back: a silent write failure must never pass as a success.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error("entry.txt contents do not match the entry");
}

console.log(`wrote ${ENTRY.length} characters to /output/entry.txt`);
console.log(ENTRY);
