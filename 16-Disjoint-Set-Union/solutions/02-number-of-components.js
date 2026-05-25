/**
 * Q2 — Number of Connected Components in an Undirected Graph
 * Difficulty: Easy
 * Expected:   O(n + e · α(n)) time · O(n) space
 * Problem:    ../questions/02-number-of-components.md
 */

function countComponents(n, edges) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(countComponents(5, [[0,1],[1,2],[3,4]]));          // 2
console.log(countComponents(5, [[0,1],[1,2],[2,3],[3,4]]));    // 1
console.log(countComponents(4, []));                           // 4

module.exports = { countComponents };
