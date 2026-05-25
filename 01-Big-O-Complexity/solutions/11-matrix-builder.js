/**
 * Q11 — Identify the Complexity: Matrix Builder
 * Difficulty: Easy–Medium
 * Expected:   O(n²) time · O(n²) space
 * Problem:    ../questions/11-matrix-builder.md
 */

function buildMatrix(n) {
  const matrix = [];
  for (let i = 0; i < n; i++) {
    matrix.push(new Array(n).fill(0));
  }
  return matrix;
}

// ── your complexity analysis ──────────────────────────────────
//
// Time complexity: O(?)
//   Justification: ...
//
// Space complexity: O(?)
//   Justification: ...
//
// Key insight: when you allocate and initialize n² cells,
// both time (writing) and space (storing) are proportional to...

// ── quick tests ──────────────────────────────────────────────
// console.log(buildMatrix(3));
// Expected:
// [ [0,0,0],
//   [0,0,0],
//   [0,0,0] ]

module.exports = { buildMatrix };
