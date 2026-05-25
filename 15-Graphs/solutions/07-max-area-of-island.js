/**
 * Q7 — Max Area of Island
 * Difficulty: Easy
 * Expected:   O(m × n) time · O(m × n) space
 * Problem:    ../questions/07-max-area-of-island.md
 */

/**
 * @param {number[][]} grid
 * @returns {number}
 */
function maxAreaOfIsland(grid) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────

console.log(maxAreaOfIsland([
  [0,0,1,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,1,1,0,1,0,0,0,0,0,0,0,0],
  [0,1,0,0,1,1,0,0,1,0,1,0,0],
  [0,1,0,0,1,1,0,0,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,1,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,1,1,0,0,0,0],
])); // 6

console.log(maxAreaOfIsland([[0,0,0,0,0,0,0,0]])); // 0

module.exports = { maxAreaOfIsland };
