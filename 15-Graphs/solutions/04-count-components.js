/**
 * Q4 — Count Connected Components
 * Difficulty: Easy
 * Expected:   O(V + E) time · O(V) space
 * Problem:    ../questions/04-count-components.md
 */

/**
 * @param {number} V - number of vertices (0 to V-1)
 * @param {number[][]} edges
 * @returns {number}
 */
function countComponents(V, edges) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────

console.log(countComponents(5, [[0,1],[1,2],[3,4]]));     // 2
console.log(countComponents(4, []));                       // 4
console.log(countComponents(4, [[0,1],[1,2],[2,3],[3,0]])); // 1

module.exports = { countComponents };
