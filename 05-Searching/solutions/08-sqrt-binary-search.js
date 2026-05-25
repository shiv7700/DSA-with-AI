/**
 * Q8 — Square Root (Integer) via Binary Search
 * Difficulty: Easy
 * Expected:   O(log n) time · O(1) space
 * Problem:    ../questions/08-sqrt-binary-search.md
 */

function mySqrt(n) {
  // TODO: return the integer square root of n (floor of the true sqrt).
  // Do not use Math.sqrt().
}

// ── quick tests ──────────────────────────────────────────────
console.log(mySqrt(4));    // 2
console.log(mySqrt(8));    // 2
console.log(mySqrt(0));    // 0
console.log(mySqrt(1));    // 1
console.log(mySqrt(100));  // 10
console.log(mySqrt(99));   // 9

module.exports = { mySqrt };
