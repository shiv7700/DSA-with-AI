/**
 * Q20 — Cheapest Flights Within K Stops
 * Difficulty: Medium
 * Expected:   O(K × E) time · O(V) space
 * Problem:    ../questions/20-cheapest-flights.md
 */

/**
 * @param {number} n - number of cities
 * @param {number[][]} flights - [from, to, price]
 * @param {number} src - source city
 * @param {number} dst - destination city
 * @param {number} k - maximum stops allowed
 * @returns {number} cheapest price, or -1 if no valid route
 */
function findCheapestPrice(n, flights, src, dst, k) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────

console.log(findCheapestPrice(4, [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], 0, 3, 1)); // 700
console.log(findCheapestPrice(3, [[0,1,100],[1,2,100],[0,2,500]], 0, 2, 1));                     // 200
console.log(findCheapestPrice(3, [[0,1,100],[1,2,100],[0,2,500]], 0, 2, 0));                     // 500

module.exports = { findCheapestPrice };
