/**
 * Q21 — Number of Islands II
 * Difficulty: Hard
 * Expected:   O(k · α(m · n)) time · O(m · n) space
 * Problem:    ../questions/21-number-of-islands-ii.md
 */

function numIslands2(m, n, positions) {
  // TODO: online DSU — add land, union neighbors, track island count
}

// ── quick tests ──────────────────────────────────────────────
console.log(numIslands2(3, 3, [[0,0],[0,1],[1,2],[2,1]])); // [1,1,2,3]

module.exports = { numIslands2 };
