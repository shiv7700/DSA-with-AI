/**
 * Q20 — Minimum Cost to Connect All Points
 * Difficulty: Medium
 * Expected:   O(n² log n) time · O(n²) space
 * Problem:    ../questions/20-min-cost-connect-points.md
 */

function minCostConnectPoints(points) {
  // TODO: generate all O(n²) edges with Manhattan distance, run Kruskal's
}

// ── quick tests ──────────────────────────────────────────────
console.log(minCostConnectPoints([[0,0],[2,2],[3,10],[5,2],[7,0]])); // 20
console.log(minCostConnectPoints([[3,12],[-2,5],[-4,1]]));           // 18

module.exports = { minCostConnectPoints };
