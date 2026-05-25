/**
 * Q13 — Number of Operations to Make Network Connected
 * Difficulty: Medium
 * Expected:   O(e · α(n)) time · O(n) space
 * Problem:    ../questions/13-make-network-connected.md
 */

function makeConnected(n, connections) {
  // TODO: need n-1 cables minimum; answer = components - 1
}

// ── quick tests ──────────────────────────────────────────────
console.log(makeConnected(4, [[0,1],[0,2],[1,2]]));          // 1
console.log(makeConnected(6, [[0,1],[0,2],[0,3],[1,2]]));    // -1
console.log(makeConnected(6, [[0,1],[0,2],[0,3],[1,2],[1,3]])); // 2

module.exports = { makeConnected };
