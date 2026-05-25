/**
 * Q08 — Coin Change
 * Difficulty: Medium
 * Expected:   O(n × amount) time · O(amount) space
 * Problem:    ../questions/08-coin-change.md
 */

function coinChange(coins, amount) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(coinChange([1, 5, 10], 12));  // 3
console.log(coinChange([2], 3));          // -1
console.log(coinChange([1, 2, 5], 11));   // 3

module.exports = { coinChange };
