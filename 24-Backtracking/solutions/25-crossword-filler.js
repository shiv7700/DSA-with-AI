/**
 * Q25 — Crossword Puzzle Filler
 * Difficulty: Hard
 * Expected:   O(W! · L) time worst case · O(slots · L) space
 * Problem:    ../questions/25-crossword-filler.md
 */

function crosswordPuzzle(grid, words) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
const grid1 = [
  "++++++++++",
  "+---------",
  "+---------",
  "+---------",
  "++++++++++",
  "+---------",
  "+---------",
  "+---------",
  "+---------",
  "++++++++++"
];
console.log(crosswordPuzzle(grid1, ["LONDON","NORWAY","OSLO","DELHI","PARIS"])); // true

module.exports = { crosswordPuzzle };
