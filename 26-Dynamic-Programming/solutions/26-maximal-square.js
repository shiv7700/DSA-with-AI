/**
 * Q26 — Maximal Square
 * Difficulty: Medium
 * Expected:   O(m × n) time · O(n) space
 * Problem:    ../questions/26-maximal-square.md
 */

function maximalSquare(matrix) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(maximalSquare([
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
])); // 4

console.log(maximalSquare([["0","1"],["1","0"]])); // 1
console.log(maximalSquare([["0"]]));               // 0

module.exports = { maximalSquare };
