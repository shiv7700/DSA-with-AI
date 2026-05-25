/**
 * Q9 — Rotting Oranges
 * Difficulty: Medium
 * Expected:   O(m × n) time · O(m × n) space
 * Problem:    ../questions/09-rotting-oranges.md
 */

/**
 * @param {number[][]} grid
 * @returns {number} minimum minutes, or -1 if impossible
 */
function orangesRotting(grid) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────

console.log(orangesRotting([[2,1,1],[1,1,0],[0,1,1]])); // 4
console.log(orangesRotting([[2,1,1],[0,1,1],[1,0,1]])); // -1
console.log(orangesRotting([[0,2]]));                   // 0

module.exports = { orangesRotting };
