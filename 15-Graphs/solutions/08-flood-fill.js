/**
 * Q8 — Flood Fill
 * Difficulty: Easy
 * Expected:   O(m × n) time · O(m × n) space
 * Problem:    ../questions/08-flood-fill.md
 */

/**
 * @param {number[][]} image
 * @param {number} sr - source row
 * @param {number} sc - source column
 * @param {number} color - new color
 * @returns {number[][]}
 */
function floodFill(image, sr, sc, color) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────

console.log(floodFill([[1,1,1],[1,1,0],[1,0,1]], 1, 1, 2));
// [[2,2,2],[2,2,0],[2,0,1]]

console.log(floodFill([[0,0,0],[0,0,0]], 0, 0, 0));
// [[0,0,0],[0,0,0]]  (same color, no change)

module.exports = { floodFill };
