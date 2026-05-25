/**
 * Q18 — Network Delay Time (Dijkstra)
 * Difficulty: Medium
 * Expected:   O((V + E) log V) time · O(V + E) space
 * Problem:    ../questions/18-network-delay-time.md
 */

/**
 * @param {number[][]} times - [source, target, weight]
 * @param {number} n - number of nodes (labeled 1..n)
 * @param {number} k - source node
 * @returns {number} max time for signal to reach all nodes, or -1
 */
function networkDelayTime(times, n, k) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────

console.log(networkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2)); // 2
console.log(networkDelayTime([[1,2,1]], 2, 1));                  // 1
console.log(networkDelayTime([[1,2,1]], 2, 2));                  // -1

module.exports = { networkDelayTime };
