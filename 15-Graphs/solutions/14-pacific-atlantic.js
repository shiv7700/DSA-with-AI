/**
 * Q14 — Pacific Atlantic Water Flow
 * Difficulty: Medium
 * Expected:   O(m × n) time · O(m × n) space
 * Problem:    ../questions/14-pacific-atlantic.md
 */

/**
 * @param {number[][]} heights
 * @returns {number[][]} list of [r, c] that can reach both oceans
 */
function pacificAtlantic(heights) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────

console.log(pacificAtlantic([
  [1,2,2,3,5],
  [3,2,3,4,4],
  [2,4,5,3,1],
  [6,7,1,4,5],
  [5,1,1,2,4],
]));
// [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]

console.log(pacificAtlantic([[1]])); // [[0,0]]

module.exports = { pacificAtlantic };
