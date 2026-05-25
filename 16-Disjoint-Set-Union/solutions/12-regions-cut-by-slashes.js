/**
 * Q12 — Regions Cut by Slashes
 * Difficulty: Medium
 * Expected:   O(n² · α(n²)) time · O(n²) space
 * Problem:    ../questions/12-regions-cut-by-slashes.md
 */

function regionsBySlashes(grid) {
  // TODO: split each cell into 4 triangles, DSU to count regions
}

// ── quick tests ──────────────────────────────────────────────
console.log(regionsBySlashes([" /","/ "]));  // 2
console.log(regionsBySlashes([" /","  "]));  // 1
console.log(regionsBySlashes(["/\\","\\/"])); // 4

module.exports = { regionsBySlashes };
