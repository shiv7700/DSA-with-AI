/**
 * Q22 — Ugly Number II
 * Difficulty: Medium
 * Expected:   O(n log n) time · O(n) space
 * Problem:    ../questions/22-ugly-number-ii.md
 */

function nthUglyNumber(n) {
  // TODO: use a min-heap starting with [1]
  // Use a Set to avoid pushing duplicates
  // Pop the current minimum ugly number; for each pop, push val*2, val*3, val*5
  // (if not already in the Set)
  // The n-th pop is the answer
}

// ── quick tests ──────────────────────────────────────────────
console.log(nthUglyNumber(10));  // 12
console.log(nthUglyNumber(1));   // 1
console.log(nthUglyNumber(15));  // 24

module.exports = { nthUglyNumber };
