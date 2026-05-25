/**
 * Q17 — Shortest Path in Binary Matrix
 * Difficulty: Medium
 * Expected:   O(n²) time · O(n²) space
 * Problem:    ../questions/17-shortest-path-binary-matrix.md
 */

/**
 * @param {number[][]} grid
 * @returns {number} length of shortest clear path, or -1
 */
function shortestPathBinaryMatrix(grid) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────

console.log(shortestPathBinaryMatrix([[0,1],[1,0]]));         // 2
console.log(shortestPathBinaryMatrix([[0,0,0],[1,1,0],[1,1,0]])); // 4
console.log(shortestPathBinaryMatrix([[1,0,0],[1,1,0],[1,1,0]])); // -1
console.log(shortestPathBinaryMatrix([[0]]));                  // 1

module.exports = { shortestPathBinaryMatrix };
