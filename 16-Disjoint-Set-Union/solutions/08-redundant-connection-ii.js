/**
 * Q8 — Redundant Connection II (Directed)
 * Difficulty: Medium
 * Expected:   O(n · α(n)) time · O(n) space
 * Problem:    ../questions/08-redundant-connection-ii.md
 */

function findRedundantDirectedConnection(edges) {
  // TODO: handle two cases — in-degree 2 or cycle (directed)
}

// ── quick tests ──────────────────────────────────────────────
console.log(findRedundantDirectedConnection([[1,2],[1,3],[2,3]]));       // [2,3]
console.log(findRedundantDirectedConnection([[1,2],[2,3],[3,4],[4,1],[1,5]])); // [4,1]

module.exports = { findRedundantDirectedConnection };
