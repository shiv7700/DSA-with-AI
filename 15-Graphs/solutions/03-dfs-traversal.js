/**
 * Q3 — DFS Traversal (Recursive & Iterative)
 * Difficulty: Easy
 * Expected:   O(V + E) time · O(V) space
 * Problem:    ../questions/03-dfs-traversal.md
 */

/**
 * @param {Map} graph
 * @param {number|string} start
 * @returns {Array}
 */
function dfsRecursive(graph, start) {
  // TODO: your solution here
}

/**
 * @param {Map} graph
 * @param {number|string} start
 * @returns {Array}
 */
function dfsIterative(graph, start) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────

const graph = new Map([
  [1, [2, 5]],
  [2, [1, 3, 4]],
  [3, [2]],
  [4, [2]],
  [5, [1]],
]);
console.log(dfsRecursive(graph, 1)); // [1, 2, 3, 4, 5]
console.log(dfsIterative(graph, 1)); // [1, 5, 2, 4, 3] (may vary)

module.exports = { dfsRecursive, dfsIterative };
