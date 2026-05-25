/**
 * Q10 — Most Stones Removed with Same Row or Column
 * Difficulty: Medium
 * Expected:   O(n · α(n)) time · O(n) space
 * Problem:    ../questions/10-most-stones-removed.md
 */

function removeStones(stones) {
  // TODO: n - (number of connected components) using virtual row/col nodes
}

// ── quick tests ──────────────────────────────────────────────
console.log(removeStones([[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]])); // 5
console.log(removeStones([[0,0]]));                               // 0

module.exports = { removeStones };
