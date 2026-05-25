/**
 * Q25 — Maximal Rectangle
 * Difficulty: Hard
 * Expected:   O(m × n) time · O(n) space
 * Problem:    ../questions/25-maximal-rectangle.md
 */

function maximalRectangle(matrix) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(maximalRectangle([
  ['1','0','1','0','0'],
  ['1','0','1','1','1'],
  ['1','1','1','1','1'],
  ['1','0','0','1','0']
])); // 6
console.log(maximalRectangle([['0']])); // 0
console.log(maximalRectangle([['1']])); // 1

module.exports = { maximalRectangle };
