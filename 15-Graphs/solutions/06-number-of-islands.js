/**
 * Q6 — Number of Islands
 * Difficulty: Easy
 * Expected:   O(m × n) time · O(m × n) space
 * Problem:    ../questions/06-number-of-islands.md
 */

/**
 * @param {string[][]} grid
 * @returns {number}
 */
function numIslands(grid) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────

console.log(numIslands([
  ['1','1','1','1','0'],
  ['1','1','0','1','0'],
  ['1','1','0','0','0'],
  ['0','0','0','0','0'],
])); // 1

console.log(numIslands([
  ['1','1','0','0','0'],
  ['1','1','0','0','0'],
  ['0','0','1','0','0'],
  ['0','0','0','1','1'],
])); // 3

module.exports = { numIslands };
