/**
 * Q16 — Is Graph Bipartite?
 * Difficulty: Medium
 * Expected:   O(V + E) time · O(V) space
 * Problem:    ../questions/16-is-bipartite.md
 */

/**
 * @param {number[][]} graph - graph[i] = array of neighbors of node i
 * @returns {boolean}
 */
function isBipartite(graph) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────

console.log(isBipartite([[1,3],[0,2],[1,3],[0,2]]));     // true
console.log(isBipartite([[1,2,3],[0,2],[0,1,3],[0,2]])); // false
console.log(isBipartite([[1],[0],[3],[2]]));              // true (two components)

module.exports = { isBipartite };
