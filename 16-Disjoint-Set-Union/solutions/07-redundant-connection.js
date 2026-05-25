/**
 * Q7 — Redundant Connection
 * Difficulty: Medium
 * Expected:   O(n · α(n)) time · O(n) space
 * Problem:    ../questions/07-redundant-connection.md
 */

function findRedundantConnection(edges) {
  // TODO: return the last edge that creates a cycle
}

// ── quick tests ──────────────────────────────────────────────
console.log(findRedundantConnection([[1,2],[1,3],[2,3]]));           // [2,3]
console.log(findRedundantConnection([[1,2],[2,3],[3,4],[1,4],[1,5]])); // [1,4]

module.exports = { findRedundantConnection };
