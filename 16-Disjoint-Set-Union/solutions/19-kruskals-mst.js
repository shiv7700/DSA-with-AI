/**
 * Q19 — Kruskal's Minimum Spanning Tree
 * Difficulty: Medium
 * Expected:   O(e log e) time · O(n) space
 * Problem:    ../questions/19-kruskals-mst.md
 */

function kruskalMST(n, edges) {
  // TODO: sort edges by weight, greedily add non-cycle edges
}

// ── quick tests ──────────────────────────────────────────────
console.log(kruskalMST(4, [[0,1,10],[0,2,6],[0,3,5],[1,3,15],[2,3,4]])); // 19
console.log(kruskalMST(4, [[0,1,1],[2,3,2]]));                           // -1

module.exports = { kruskalMST };
