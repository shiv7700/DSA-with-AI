/**
 * Q2 — BFS Traversal
 * Difficulty: Easy
 * Expected:   O(V + E) time · O(V) space
 * Problem:    ../questions/02-bfs-traversal.md
 */

/**
 * @param {Map<number|string, Array>} graph - adjacency list
 * @param {number|string} start
 * @returns {Array} nodes in BFS visit order
 */
function bfsTraversal(graph, start) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────

const graph = new Map([
  [1, [2, 3]],
  [2, [1, 4, 5]],
  [3, [1]],
  [4, [2]],
  [5, [2]],
]);
console.log(bfsTraversal(graph, 1)); // [1, 2, 3, 4, 5]

module.exports = { bfsTraversal };
