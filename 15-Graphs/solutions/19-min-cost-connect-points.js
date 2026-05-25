/**
 * Q19 — Min Cost to Connect All Points
 * Difficulty: Medium
 * Expected:   O(n² log n) time · O(n) space
 * Problem:    ../questions/19-min-cost-connect-points.md
 */

/**
 * @param {number[][]} points - [[x, y], ...]
 * @returns {number} minimum total Manhattan distance to connect all points (MST)
 */
function minCostConnectPoints(points) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────

console.log(minCostConnectPoints([[0,0],[2,2],[3,10],[5,2],[7,0]])); // 20
console.log(minCostConnectPoints([[3,12],[-2,5],[-4,1]]));           // 18
console.log(minCostConnectPoints([[0,0]]));                           // 0

module.exports = { minCostConnectPoints };
