/**
 * Q4 — Graph Valid Tree
 * Difficulty: Easy
 * Expected:   O(n + e · α(n)) time · O(n) space
 * Problem:    ../questions/04-graph-valid-tree.md
 */

function validTree(n, edges) {
  // TODO: no cycle AND fully connected
}

// ── quick tests ──────────────────────────────────────────────
console.log(validTree(5, [[0,1],[0,2],[0,3],[1,4]]));         // true
console.log(validTree(5, [[0,1],[1,2],[2,3],[1,3],[1,4]]));   // false (cycle)
console.log(validTree(4, [[0,1],[2,3]]));                     // false (disconnected)

module.exports = { validTree };
