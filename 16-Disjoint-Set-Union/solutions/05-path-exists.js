/**
 * Q5 — Find if Path Exists in an Undirected Graph
 * Difficulty: Easy
 * Expected:   O((n + e) · α(n)) time · O(n) space
 * Problem:    ../questions/05-path-exists.md
 */

function validPath(n, edges, source, destination) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(validPath(3, [[0,1],[1,2],[2,0]], 0, 2));                  // true
console.log(validPath(6, [[0,1],[0,2],[3,5],[5,4],[4,3]], 0, 5));      // false
console.log(validPath(1, [], 0, 0));                                   // true

module.exports = { validPath };
