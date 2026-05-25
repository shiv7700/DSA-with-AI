/**
 * Q10 — 01 Matrix (Distance to Nearest 0)
 * Difficulty: Medium
 * Expected:   O(m × n) time · O(m × n) space
 * Problem:    ../questions/10-01-matrix.md
 */

/**
 * @param {number[][]} matrix
 * @returns {number[][]}
 */
function updateMatrix(matrix) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────

console.log(updateMatrix([[0,0,0],[0,1,0],[0,0,0]]));
// [[0,0,0],[0,1,0],[0,0,0]]

console.log(updateMatrix([[0,0,0],[0,1,0],[1,1,1]]));
// [[0,0,0],[0,1,0],[1,2,1]]

module.exports = { updateMatrix };
