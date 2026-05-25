/**
 * Q15 — Capacity to Ship Packages Within D Days
 * Difficulty: Medium
 * Expected:   O(n log(sum)) time · O(1) space
 * Problem:    ../questions/15-capacity-to-ship.md
 */

function shipWithinDays(weights, days) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(shipWithinDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5));  // 15
console.log(shipWithinDays([3, 2, 2, 4, 1, 4], 3));                // 6
console.log(shipWithinDays([1, 2, 3, 1, 1], 4));                   // 3

module.exports = { shipWithinDays };
