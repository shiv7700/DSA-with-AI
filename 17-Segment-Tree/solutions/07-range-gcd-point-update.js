/**
 * Q7 — Range GCD Query, Point Update
 * Difficulty: Easy
 * Expected:   O(n log MAX) build · O(log n · log MAX) per query/update · O(n) space
 * Problem:    ../questions/07-range-gcd-point-update.md
 */

class RangeGcd {
  constructor(nums) {
    // TODO: build GCD segment tree
  }

  update(index, val) {
    // TODO: point update
  }

  gcdRange(left, right) {
    // TODO: range GCD query
  }
}

// ── quick tests ──────────────────────────────────────────────
const rg = new RangeGcd([12, 6, 4, 8, 3]);
console.log(rg.gcdRange(0, 1)); // 6

module.exports = { RangeGcd };
