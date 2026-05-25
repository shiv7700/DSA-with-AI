/**
 * Q5 — Has Path (BFS / DFS)
 * Difficulty: Easy
 * Expected:   O(V + E) time · O(V) space
 * Problem:    ../questions/05-has-path.md
 */

/**
 * @param {Map} graph - directed adjacency list
 * @param {number|string} src
 * @param {number|string} dst
 * @returns {boolean}
 */
function hasPath(graph, src, dst) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────

const graph = new Map([
  ['A', ['B', 'C']],
  ['B', ['D']],
  ['C', ['E']],
  ['D', []],
  ['E', []],
]);
console.log(hasPath(graph, 'A', 'E')); // true
console.log(hasPath(graph, 'A', 'D')); // true
console.log(hasPath(graph, 'D', 'A')); // false

module.exports = { hasPath };
